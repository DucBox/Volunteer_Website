from pypdf import PdfReader
from app.processors.base import BaseDocumentProcessor


class PDFProcessor(BaseDocumentProcessor):
    @property
    def supported_extensions(self) -> list[str]:
        return [".pdf"]

    def extract_text(self, file_path: str) -> str:
        reader = PdfReader(file_path)
        text = ""
        for page in reader.pages:
            text += page.extract_text() or ""
        return text.strip()