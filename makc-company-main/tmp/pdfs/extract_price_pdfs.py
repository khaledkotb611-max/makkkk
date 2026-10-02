import json
import sys
from pathlib import Path

sys.path.insert(0, "/private/tmp/pdfdeps")

import pdfplumber

files = [
    Path("/Users/khaledkotb/Downloads/جديد مواسير.pdf"),
    Path("/Users/khaledkotb/Downloads/جديد قطع.pdf"),
    Path("/Users/khaledkotb/Downloads/تعديل بولى 2.pdf"),
    Path("/Users/khaledkotb/Downloads/بولى 1.pdf"),
]

out_dir = Path("tmp/pdfs/extracted")
out_dir.mkdir(parents=True, exist_ok=True)

summary = []

for file_path in files:
    with pdfplumber.open(file_path) as pdf:
        file_summary = {
            "file": str(file_path),
            "pages": len(pdf.pages),
            "page_summaries": [],
        }

        text_parts = []
        table_rows = []

        for index, page in enumerate(pdf.pages, start=1):
            text = page.extract_text(x_tolerance=1.5, y_tolerance=3) or ""
            tables = page.extract_tables() or []
            page_rows = sum(len(table or []) for table in tables)

            text_parts.append(f"\n--- PAGE {index} ---\n{text}")
            for table_index, table in enumerate(tables, start=1):
                for row in table:
                    table_rows.append({
                        "page": index,
                        "table": table_index,
                        "row": row,
                    })

            file_summary["page_summaries"].append({
                "page": index,
                "chars": len(text),
                "tables": len(tables),
                "rows": page_rows,
            })

        stem = file_path.stem.replace(" ", "_")
        (out_dir / f"{stem}.txt").write_text("\n".join(text_parts), encoding="utf-8")
        (out_dir / f"{stem}.tables.json").write_text(
            json.dumps(table_rows, ensure_ascii=False, indent=2),
            encoding="utf-8",
        )
        summary.append(file_summary)

print(json.dumps(summary, ensure_ascii=False, indent=2))
