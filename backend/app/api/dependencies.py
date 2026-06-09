import os
from typing import Optional
from fastapi import HTTPException, Header
from app.services.rag_engine import RAGEngine

_rag: Optional[RAGEngine] = None


def get_rag_engine() -> RAGEngine:
    global _rag
    if _rag is None:
        _rag = RAGEngine()
    return _rag


def verify_admin_key(x_admin_key: Optional[str] = Header(default=None)):
    expected = os.getenv("ADMIN_API_KEY", "")
    if not expected or x_admin_key != expected:
        raise HTTPException(status_code=401, detail="Unauthorized")
