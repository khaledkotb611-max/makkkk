from django.urls import path

from . import views


urlpatterns = [
    path("api/health", views.health),
    path("api/products", views.products),
    path("api/catalog", views.catalog),
    path("api/quotes", views.quotes),
    path("", views.homepage),
    path("products", views.products_page),
    path("products/", views.products_page),
    path("product/<path:slug>", views.product_page),
    path("<path:requested_path>", views.static_asset),
]