import json
from pathlib import Path

from django.conf import settings
from django.core.management.base import BaseCommand

from products.models import Category, Product
from vendors.models import Vendor


DATA_DIR = Path(settings.BASE_DIR).parent / "data"


class Command(BaseCommand):
    help = (
        "Loads vendors, categories, and products from JSON files "
        "into the database."
    )

    def add_arguments(self, parser):
        parser.add_argument(
            "--flush",
            action="store_true",
            help="Delete existing vendors/categories/products before seeding.",
        )

    def handle(self, *args, **options):

        vendors_path = DATA_DIR / "vendors.json"
        categories_path = DATA_DIR / "categories.json"
        products_path = DATA_DIR / "products.json"

        # Check JSON files exist
        for p in (vendors_path, categories_path, products_path):
            if not p.exists():
                self.stderr.write(
                    self.style.ERROR(f"Missing file: {p}")
                )
                return

        # Delete old catalog data if --flush is used
        if options["flush"]:
            Product.objects.all().delete()
            Category.objects.all().delete()
            Vendor.objects.all().delete()

            self.stdout.write(
                "Cleared existing catalog data."
            )

        # Load JSON files
        vendors_data = json.loads(
            vendors_path.read_text(encoding="utf-8")
        )

        categories_data = json.loads(
            categories_path.read_text(encoding="utf-8")
        )

        products_data = json.loads(
            products_path.read_text(encoding="utf-8")
        )

        # ==========================
        # IMPORT VENDORS
        # ==========================

        vendor_map = {}

        for v in vendors_data:

            vendor, _ = Vendor.objects.update_or_create(
                slug=v["slug"],
                defaults={
                    "name": v["name"],
                    "logo": v.get("logo", ""),
                    "banner": v.get("banner", ""),
                    "bio": v.get("bio", ""),
                    "rating": v.get("rating", 0),
                    "reviews_count": v.get("reviewsCount", 0),
                    "sales_count": v.get("salesCount", ""),
                    "location": v.get("location", ""),
                    "join_date": v.get("joinDate", ""),
                    "verified": v.get("verified", False),
                    "response_rate": v.get("responseRate", ""),
                    "badges": v.get("badges", []),
                },
            )

            vendor_map[v["id"]] = vendor

        self.stdout.write(
            self.style.SUCCESS(
                f"Seeded {len(vendor_map)} vendors."
            )
        )

        # ==========================
        # IMPORT CATEGORIES
        # ==========================

        category_map = {}

        for c in categories_data:

            category, _ = Category.objects.update_or_create(
                slug=c["id"],
                defaults={
                    "name": c["name"],
                    "icon": c.get("icon", ""),
                    "description": c.get("description", ""),
                    "banner": c.get("banner", ""),
                },
            )

            category_map[c["id"]] = category

        self.stdout.write(
            self.style.SUCCESS(
                f"Seeded {len(category_map)} categories."
            )
        )

        # ==========================
        # IMPORT PRODUCTS
        # ==========================

        created_products = 0

        for p in products_data:

            vendor = vendor_map.get(
                p.get("vendorId")
            )

            category = category_map.get(
                p.get("category")
            )

            if not vendor:
                self.stdout.write(
                    self.style.WARNING(
                        f"Skipping {p.get('title')} - vendor not found"
                    )
                )
                continue

            if not category:
                self.stdout.write(
                    self.style.WARNING(
                        f"Skipping {p.get('title')} - category not found"
                    )
                )
                continue

            slug = p["id"]

            Product.objects.update_or_create(
                slug=slug,
                defaults={
                    "title": p["title"],
                    "description": p.get("description", ""),
                    "price": p.get("price", 0),
                    "original_price": p.get("originalPrice"),
                    "category": category,
                    "vendor": vendor,
                    "images": p.get("images", []),
                    "tags": p.get("tags", []),
                    "attributes": p.get("attributes", {}),
                    "stock": p.get("stock", 0),
                    "rating": p.get("rating", 0),
                    "reviews_count": p.get("reviewsCount", 0),
                    "is_featured": p.get("isFeatured", False),
                    "is_new": p.get("isNew", False),
                },
            )

            created_products += 1

        self.stdout.write(
            self.style.SUCCESS(
                f"Seeded {created_products} products."
            )
        )

        self.stdout.write(
            self.style.SUCCESS(
                "Data imported successfully!"
            )
        )