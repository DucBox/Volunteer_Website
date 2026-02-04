from app.processors.base import BaseDocumentProcessor


class TXTProcessor(BaseDocumentProcessor):
    @property
    def supported_extensions(self) -> list[str]:
        return [".txt"]

    def extract_text(self, file_path: str) -> str:
        with open(file_path, "r", encoding="utf-8") as f:
            return f.read().strip()