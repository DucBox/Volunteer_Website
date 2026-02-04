from fastapi import APIRouter
from app.services.rag_engine import RAGEngine
from app.schemas.chat import ChatRequest, ChatResponse

router = APIRouter(prefix="/api/chat", tags=["Chat"])

rag = RAGEngine()


@router.post("", response_model=ChatResponse)
async def chat(request: ChatRequest):
    result = rag.query(question=request.question, top_k=request.top_k)
    return result