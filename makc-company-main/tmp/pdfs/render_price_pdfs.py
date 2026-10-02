import sys
from pathlib import Path

sys.path.insert(0, "/private/tmp/pdfdeps")

import pypdfium2 as pdfium

files = [
    Path("/Users/khaledkotb/Downloads/جديد مواسير.pdf"),
    Path("/Users/khaledkotb/Downloads/جديد قطع.pdf"),
    Path("/Users/khaledkotb/Downloads/تعديل بولى 2.pdf"),
    Path("/Users/khaledkotb/Downloads/بولى 1.pdf"),
]

out_dir = Path("tmp/pdfs/rendered")
out_dir.mkdir(parents=True, exist_ok=True)

for file_path in files:
    document = pdfium.PdfDocument(str(file_path))
    for index, page in enumerate(document, start=1):
        bitmap = page.render(scale=2.2).to_pil()
        output = out_dir / f"{file_path.stem.replace(' ', '_')}-{index}.png"
        bitmap.save(output)
        print(output)
