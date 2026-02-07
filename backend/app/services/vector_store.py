import chromadb
from app.config import settings
from app.services.embedding import EmbeddingService


class VectorStoreService:
    def __init__(self):
        self.client = chromadb.PersistentClient(path=settings.CHROMA_PERSIST_DIR)
        self.collection = self.client.get_or_create_collection(name="documents")
        self.embedding_service = EmbeddingService()

    def add(self, chunk_id: str, text: str, metadata: dict):
        """Add single chunk to store"""
        vector = self.embedding_service.embed(text)
        self.collection.upsert(
            ids=[chunk_id],
            embeddings=[vector],
            documents=[text],
            metadatas=[metadata]
        )

    def search(self, query: str, top_k: int = 10) -> list[dict]:
        """Search similar chunks"""
        query_vector = self.embedding_service.embed(query)
        results = self.collection.query(
            query_embeddings=[query_vector],
            n_results=top_k
        )
        return [
            {"id": id, "text": doc, "metadata": meta}
            for id, doc, meta in zip(
                results["ids"][0],
                results["documents"][0],
                results["metadatas"][0]
            )
        ]

    def delete_by_doc_id(self, doc_id: str):
        """Delete all chunks by doc_id"""
        self.collection.delete(where={"doc_id": doc_id})

    def list_documents(self) -> list[dict]:
        """List all unique documents"""
        all_data = self.collection.get(include=["metadatas"])
        
        seen = {}
        for meta in all_data["metadatas"]:
            doc_id = meta["doc_id"]
            if doc_id not in seen:
                seen[doc_id] = {
                    "doc_id": doc_id,
                    "doc_name": meta["doc_name"],
                    "file_name": meta["file_name"]
                }
        
        return list(seen.values())

    def count(self) -> int:
        """Total chunks in store"""
        return self.collection.count()