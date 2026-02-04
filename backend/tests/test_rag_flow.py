from app.services.rag_engine import RAGEngine

rag = RAGEngine()

# 1. Ingest document
print("=== INGEST ===")
result = rag.ingest(
    file_path="path/to/your/document.pdf",  # Thay bằng file thật
    doc_name="Giới thiệu dự án XYZ"
)
print(f"Doc ID: {result['doc_id']}")
print(f"Doc Name: {result['doc_name']}")
print(f"Chunks: {result['chunks']}")

# 2. List documents
print("\n=== LIST ===")
docs = rag.list_documents()
for doc in docs:
    print(f"- {doc['doc_name']} ({doc['file_name']})")

# 3. Query
print("\n=== QUERY ===")
response = rag.query("Dự án này về gì?")
print(f"Answer: {response['answer']}")
print(f"Sources: {len(response['sources'])} chunks")

# 4. Delete
print("\n=== DELETE ===")
rag.delete_document(doc_id=result["doc_id"])
print(f"Remaining docs: {rag.list_documents()}")