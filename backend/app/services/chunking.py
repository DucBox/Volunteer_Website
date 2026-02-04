from langchain_text_splitters import RecursiveCharacterTextSplitter
from app.config import settings


class ChunkingService:
    def __init__(self):
        self.splitter = RecursiveCharacterTextSplitter(
            chunk_size=settings.CHUNK_SIZE,
            chunk_overlap=settings.CHUNK_OVERLAP
        )

    def split(self, text: str) -> list[str]:
        """Split text into chunks"""
        return self.splitter.split_text(text)