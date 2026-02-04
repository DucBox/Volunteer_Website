from openai import OpenAI
from app.config import settings


class EmbeddingService:
    def __init__(self):
        self.client = OpenAI(api_key=settings.OPENAI_API_KEY)
        self.model = settings.EMBEDDING_MODEL

    def embed(self, text: str) -> list[float]:
        """Embed single text"""
        response = self.client.embeddings.create(
            input=text,
            model=self.model
        )
        return response.data[0].embedding

    def embed_batch(self, texts: list[str]) -> list[list[float]]:
        """Embed multiple texts"""
        response = self.client.embeddings.create(
            input=texts,
            model=self.model
        )
        # Sort by index to maintain order
        sorted_data = sorted(response.data, key=lambda x: x.index)
        return [item.embedding for item in sorted_data]