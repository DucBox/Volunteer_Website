import os
import shutil
from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from app.services.rag_engine import RAGEngine
from app.schemas.document import IngestResponse, DocumentInfo, DeleteResponse, DocumentContent

router = APIRouter(prefix="/api/documents", tags=["Documents"])

rag = RAGEngine()
UPLOAD_DIR = "/workspace/backend/data/uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)


@router.post("/upload", response_model=IngestResponse)
async def upload_document(
    file: UploadFile = File(...),
    doc_name: str = Form(...)
):
    # Save file
    file_path = f"{UPLOAD_DIR}/{file.filename}"
    with open(file_path, "wb") as f:
        shutil.copyfileobj(file.file, f)

    # Ingest
    try:
        result = rag.ingest(file_path=file_path, doc_name=doc_name)
        return result
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    finally:
        os.remove(file_path)
    

@router.get("/{doc_id}/content", response_model=DocumentContent)
async def get_document_content(doc_id: str):
    """Lấy full content của document từ chunks"""
    chunks = rag.vector_store.get_document_chunks(doc_id)
    
    if not chunks:
        raise HTTPException(status_code=404, detail="Document not found")
    
    # Ghép tất cả chunks lại
    full_text = "\n\n".join([chunk["text"] for chunk in chunks])
    
    return {
        "doc_id": doc_id,
        "content": full_text,
        "total_chunks": len(chunks)
    }


@router.get("", response_model=list[DocumentInfo])
async def list_documents():
    return rag.list_documents()


@router.delete("/{doc_id}", response_model=DeleteResponse)
async def delete_document(doc_id: str):
    rag.delete_document(doc_id=doc_id)
    return {"message": "Deleted successfully", "doc_id": doc_id}