from pydantic import BaseModel


class ChatRequest(BaseModel):
    question: str
    top_k: int = 5


class SourceChunk(BaseModel):
    id: str
    text: str
    metadata: dict


class ChatResponse(BaseModel):
    answer: str
    sources: list[SourceChunk]