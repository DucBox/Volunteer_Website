from pydantic import BaseModel, Field
from typing import Optional

class ChatRequest(BaseModel):
    question: str = Field(min_length=1, max_length=2000)
    formatted_prompt: Optional[str] = Field(default=None, max_length=20000)
    top_k: int = Field(default=10, ge=1, le=50)

class SourceChunk(BaseModel):
    id: str
    text: str
    metadata: dict


class ChatResponse(BaseModel):
    answer: str
    sources: list[SourceChunk]