import json
import re
import time
import uuid
from datetime import datetime, timezone

from django.conf import settings
from django.core.cache import cache
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.static import serve


def _json_response(payload, status=200):
    response = JsonResponse(payload, status=status)
    response["Access-Control-Allow-Origin"] = "*"
    response["Cache-Control"] = "no-store"
    response["X-Content-Type-Options"] = "nosniff"
    return response


def _load_catalog():
    with settings.CATALOG_PATH.open(encoding="utf-8") as catalog_file:
        return json.load(catalog_file)


def _client_address(request):
    forwarded_for = request.headers.get("X-Forwarded-For", "")
    return forwarded_for.split(",")[0].strip() or request.META.get("REMOTE_ADDR", "unknown")


def _is_rate_limited(request):
    now = time.time()
    key = f"quote-attempts:{_client_address(request)}"
    attempts = [stamp for stamp in cache.get(key, []) if now - stamp < 600]
    attempts.append(now)
    cache.set(key, attempts, timeout=600)
    return len(attempts) > 5


def _read_quotes():
    try:
        with settings.QUOTES_PATH.open(encoding="utf-8") as quotes_file:
            return [json.loads(line) for line in quotes_file if line.strip()]
    except (OSError, json.JSONDecodeError):
        return []


def health(request):
    if request.method != "GET":
        return _json_response({"error": "Method not allowed"}, status=405)
    return _json_response({"ok": True, "service": "mak-backend"})


def products(request):
    if request.method != "GET":
        return _json_response({"error": "Method not allowed"}, status=405)
    try:
        catalog_data = _load_catalog()
    except (OSError, json.JSONDecodeError):
        return _json_response({"error": "Catalog unavailable"}, status=500)
    return _json_response({
        "updatedAt": catalog_data.get("updatedAt"),
        "currency": catalog_data.get("currency"),
        "products": catalog_data.get("products", []),
    })


def catalog(request):
    if request.method != "GET":
        return _json_response({"error": "Method not allowed"}, status=405)
    try:
        return _json_response(_load_catalog())
    except (OSError, json.JSONDecodeError):
        return _json_response({"error": "Catalog unavailable"}, status=500)


@csrf_exempt
def quotes(request):
    if request.method == "GET":
        if not settings.ADMIN_TOKEN or request.headers.get("Authorization") != f"Bearer {settings.ADMIN_TOKEN}":
            return _json_response({"error": "Admin authorization required"}, status=401)
        return _json_response({"quotes": _read_quotes()})
    if request.method != "POST":
        return _json_response({"error": "Method not allowed"}, status=405)

    if _is_rate_limited(request):
        return _json_response({"error": "Too many quote requests. Try again later."}, status=429)
    if len(request.body) > 100_000:
        return _json_response({"error": "Request body is too large"}, status=400)

    try:
        body = json.loads(request.body or b"{}")
        if not isinstance(body, dict):
            raise ValueError("Request body must be a JSON object")
    except (json.JSONDecodeError, UnicodeDecodeError, ValueError):
        return _json_response({"error": "Invalid quote request"}, status=400)

    required_fields = ("name", "email", "projectType", "message")
    missing_field = next((field for field in required_fields if not str(body.get(field) or "").strip()), None)
    if missing_field:
        return _json_response({"error": f"{missing_field} is required"}, status=400)

    email = str(body.get("email", "")).strip()[:160]
    if not re.fullmatch(r"[^\s@]+@[^\s@]+\.[^\s@]+", email):
        return _json_response({"error": "A valid email is required"}, status=400)

    quote = {
        "id": str(uuid.uuid4()),
        "name": str(body.get("name", "")).strip()[:120],
        "email": email,
        "phone": str(body.get("phone", "")).strip()[:40],
        "projectType": str(body.get("projectType", "")).strip()[:80],
        "message": str(body.get("message", "")).strip()[:2000],
        "createdAt": datetime.now(timezone.utc).isoformat().replace("+00:00", "Z"),
    }
    settings.DATA_DIR.mkdir(parents=True, exist_ok=True)
    with settings.QUOTES_PATH.open("a", encoding="utf-8") as quotes_file:
        quotes_file.write(f"{json.dumps(quote, ensure_ascii=False)}\n")
    return _json_response({"ok": True, "quoteId": quote["id"]}, status=201)


def _serve_site_file(request, relative_path):
    return serve(request, relative_path, document_root=str(settings.BASE_DIR))


def homepage(request):
    return _serve_site_file(request, "index.html")


def products_page(request):
    return _serve_site_file(request, "products.html")


def product_page(request, slug):
    return _serve_site_file(request, "product.html")


def static_asset(request, requested_path):
    return _serve_site_file(request, requested_path)