from fastapi import APIRouter, Request, Depends
from slowapi import Limiter
from slowapi.util import get_remote_address
from app.api.dependencies import get_rag_engine
from app.schemas.chat import ChatRequest, ChatResponse

router = APIRouter(prefix="/api/chat", tags=["Chat"])

limiter = Limiter(key_func=get_remote_address)


@router.post("", response_model=ChatResponse)
@limiter.limit("20/minute")
async def chat(request: Request, chat_request: ChatRequest, rag=Depends(get_rag_engine)):
    result = rag.query(question=chat_request.question, top_k=chat_request.top_k, formatted_prompt=chat_request.formatted_prompt)
    return result