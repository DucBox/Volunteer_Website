from app.processors.base import BaseDocumentProcessor
from app.processors.pdf_processor import PDFProcessor
from app.processors.docx_processor import DOCXProcessor
from app.processors.txt_processor import TXTProcessor


class ProcessorFactory:
    def __init__(self):
        self.processors: dict[str, BaseDocumentProcessor] = {}
        self._register_defaults()

    def _register_defaults(self):
        for processor in [PDFProcessor(), DOCXProcessor(), TXTProcessor()]:
            for ext in processor.supported_extensions:
                self.processors[ext] = processor

    def get_processor(self, file_path: str) -> BaseDocumentProcessor:
        ext = "." + file_path.rsplit(".", 1)[-1].lower()
        if ext not in self.processors:
            raise ValueError(f"Unsupported file type: {ext}")
        return self.processors[ext]

    def register(self, processor: BaseDocumentProcessor):
        for ext in processor.supported_extensions:
            self.processors[ext] = processor