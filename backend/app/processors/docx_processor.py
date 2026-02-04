from docx import Document
from app.processors.base import BaseDocumentProcessor


class DOCXProcessor(BaseDocumentProcessor):
    @property
    def supported_extensions(self) -> list[str]:
        return [".doc", ".docx"]

    def extract_text(self, file_path: str) -> str:
        doc = Document(file_path)
        text = "\n".join([para.text for para in doc.paragraphs])
        return text.strip()