# MAK Backend

The backend uses Django and keeps the catalog in `data/catalog.json` and quote requests in `data/quotes.jsonl`.

## Setup

```bash
python3 -m venv .venv
source .venv/bin/activate
python -m pip install -r requirements.txt
```

## Run

```bash
npm start
```

Or run Django directly:

```bash
python manage.py runserver 0.0.0.0:8000
```

To use another port, pass it to Django:

```bash
python manage.py runserver 0.0.0.0:8001
```

## API

- `GET /api/health` checks that the service is running.
- `GET /api/products` returns the product cards and image paths.
- `GET /api/catalog` returns products and all MAK price-list rows.
- `POST /api/quotes` validates and stores a quote request in `data/quotes.jsonl`.
- `GET /api/quotes` returns saved requests when an admin token is configured.

Configure the protected admin endpoint with:

```bash
ADMIN_TOKEN=change-this-token python manage.py runserver 0.0.0.0:8000
```

Then send:

```text
Authorization: Bearer change-this-token
```

Quote requests are rate-limited per client address and validated for required fields and email format. The frontend keeps WhatsApp as a fallback when the API is unavailable.
