from abc import ABC, abstractmethod


class BaseDocumentProcessor(ABC):
    @abstractmethod
    def extract_text(self, file_path: str) -> str:
        """Extract text from document"""
        pass

    @property
    @abstractmethod
    def supported_extensions(self) -> list[str]:
        """List of supported file extensions"""
        pass