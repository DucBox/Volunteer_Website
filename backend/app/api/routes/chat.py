from fastapi import APIRouter, Request
from slowapi import Limiter
from slowapi.util import get_remote_address
from app.services.rag_engine import RAGEngine
from app.schemas.chat import ChatRequest, ChatResponse

router = APIRouter(prefix="/api/chat", tags=["Chat"])

# Initialize rate limiter
limiter = Limiter(key_func=get_remote_address)

rag = RAGEngine()


@router.post("", response_model=ChatResponse)
@limiter.limit("20/minute")  # 20 requests per minute per IP
async def chat(request: Request, chat_request: ChatRequest):
    result = rag.query(question=chat_request.question, top_k=chat_request.top_k)
    return result