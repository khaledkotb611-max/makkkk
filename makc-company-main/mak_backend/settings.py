import os
from pathlib import Path


BASE_DIR = Path(__file__).resolve().parent.parent
SECRET_KEY = os.environ.get("DJANGO_SECRET_KEY", "local-development-key-change-before-deploy")
DEBUG = os.environ.get("DJANGO_DEBUG", "false").lower() == "true"
ALLOWED_HOSTS = os.environ.get("DJANGO_ALLOWED_HOSTS", "*").split(",")
ROOT_URLCONF = "mak_backend.urls"
WSGI_APPLICATION = "mak_backend.wsgi.application"
APPEND_SLASH = False
INSTALLED_APPS = []
MIDDLEWARE = ["django.middleware.security.SecurityMiddleware"]
CACHES = {
    "default": {
        "BACKEND": "django.core.cache.backends.locmem.LocMemCache",
        "LOCATION": "mak-backend-rate-limit",
    }
}
DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

DATA_DIR = BASE_DIR / "data"
CATALOG_PATH = DATA_DIR / "catalog.json"
QUOTES_PATH = DATA_DIR / "quotes.jsonl"
ADMIN_TOKEN = os.environ.get("ADMIN_TOKEN", "")