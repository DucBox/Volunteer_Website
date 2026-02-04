import uuid
from app.processors.factory import ProcessorFactory
from app.services.chunking import ChunkingService
from app.services.vector_store import VectorStoreService
from app.services.llm import LLMService


class RAGEngine:
    def __init__(self):
        self.processor_factory = ProcessorFactory()
        self.chunking = ChunkingService()
        self.vector_store = VectorStoreService()
        self.llm = LLMService()

    def ingest(self, file_path: str, doc_name: str) -> dict:
        """Ingest document: extract → chunk → embed → store"""
        # Extract
        processor = self.processor_factory.get_processor(file_path)
        text = processor.extract_text(file_path)

        # Get file name from path
        file_name = file_path.rsplit("/", 1)[-1]

        # Chunk
        chunks = self.chunking.split(text)

        # Store với metadata
        doc_id = str(uuid.uuid4())
        for i, chunk in enumerate(chunks):
            chunk_id = f"{doc_id}_{i}"
            metadata = {
                "doc_id": doc_id,
                "doc_name": doc_name,
                "file_name": file_name,
                "chunk_index": i
            }
            self.vector_store.add(chunk_id=chunk_id, text=chunk, metadata=metadata)

        return {"doc_id": doc_id, "doc_name": doc_name, "chunks": len(chunks)}

    def list_documents(self) -> list[dict]:
        """List all documents"""
        return self.vector_store.list_documents()

    def delete_document(self, doc_id: str):
        """Delete document by doc_id"""
        self.vector_store.delete_by_doc_id(doc_id)

    def query(self, question: str, top_k: int = 5) -> dict:
        """Query: search → build context → generate"""
        # Retrieve
        results = self.vector_store.search(question, top_k=top_k)

        # Build context
        context = "\n\n".join([r["text"] for r in results])

        # Generate
        answer = self.llm.generate(prompt=question, context=context)

        return {
            "answer": answer,
            "sources": results
        }