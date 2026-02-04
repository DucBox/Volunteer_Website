import os
import shutil
from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from app.services.rag_engine import RAGEngine
from app.schemas.document import IngestResponse, DocumentInfo, DeleteResponse

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


@router.get("", response_model=list[DocumentInfo])
async def list_documents():
    return rag.list_documents()


@router.delete("/{doc_id}", response_model=DeleteResponse)
async def delete_document(doc_id: str):
    rag.delete_document(doc_id=doc_id)
    return {"message": "Deleted successfully", "doc_id": doc_id}