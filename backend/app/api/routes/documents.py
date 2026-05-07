import os
import uuid
import logging
from typing import Optional
from fastapi import APIRouter, UploadFile, File, Form, HTTPException, Depends, Header, Request
from app.services.rag_engine import RAGEngine
from app.schemas.document import IngestResponse, DocumentInfo, DeleteResponse, DocumentContent
from slowapi import Limiter
from slowapi.util import get_remote_address

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api/documents", tags=["Documents"])
limiter = Limiter(key_func=get_remote_address)

rag = RAGEngine()
UPLOAD_DIR = "/workspace/backend/data/uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

ALLOWED_EXTENSIONS = {".pdf", ".txt", ".docx"}
ALLOWED_MIME_TYPES = {
    "application/pdf",
    "text/plain",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
}
MAX_FILE_SIZE = 10 * 1024 * 1024  # 10MB


def verify_admin_key(x_admin_key: Optional[str] = Header(default=None)):
    expected = os.getenv("ADMIN_API_KEY", "")
    if not expected or x_admin_key != expected:
        raise HTTPException(status_code=401, detail="Unauthorized")


@router.post("/upload", response_model=IngestResponse, dependencies=[Depends(verify_admin_key)])
@limiter.limit("5/minute")
async def upload_document(
    request: Request,
    file: UploadFile = File(...),
    doc_name: str = Form(...)
):
    ext = os.path.splitext(file.filename or "")[1].lower()
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(status_code=400, detail="Unsupported file type")

    if file.content_type not in ALLOWED_MIME_TYPES:
        raise HTTPException(status_code=400, detail="Unsupported file type")

    content = await file.read()
    if len(content) > MAX_FILE_SIZE:
        raise HTTPException(status_code=400, detail="File too large (max 10MB)")

    safe_name = f"{uuid.uuid4()}{ext}"
    file_path = os.path.join(UPLOAD_DIR, safe_name)

    try:
        with open(file_path, "wb") as f:
            f.write(content)
        result = rag.ingest(file_path=file_path, doc_name=doc_name)
        return result
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid file or processing error")
    except Exception:
        logger.exception("Upload failed")
        raise HTTPException(status_code=500, detail="Upload failed")
    finally:
        if os.path.exists(file_path):
            os.remove(file_path)


@router.get("/{doc_id}/content", response_model=DocumentContent, dependencies=[Depends(verify_admin_key)])
async def get_document_content(doc_id: str):
    chunks = rag.vector_store.get_document_chunks(doc_id)
    if not chunks:
        raise HTTPException(status_code=404, detail="Document not found")
    full_text = "\n\n".join([chunk["text"] for chunk in chunks])
    return {"doc_id": doc_id, "content": full_text, "total_chunks": len(chunks)}


@router.get("", response_model=list[DocumentInfo], dependencies=[Depends(verify_admin_key)])
async def list_documents():
    return rag.list_documents()


@router.delete("/{doc_id}", response_model=DeleteResponse, dependencies=[Depends(verify_admin_key)])
@limiter.limit("10/minute")
async def delete_document(request: Request, doc_id: str):
    try:
        rag.delete_document(doc_id=doc_id)
    except Exception:
        logger.exception("Delete failed")
        raise HTTPException(status_code=500, detail="Delete failed")
    return {"message": "Deleted successfully", "doc_id": doc_id}