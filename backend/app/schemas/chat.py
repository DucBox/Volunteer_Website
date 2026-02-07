from pydantic import BaseModel


class ChatRequest(BaseModel):
    question: str  
    formatted_prompt: Optional[str] = None 
    top_k: int = 10



class SourceChunk(BaseModel):
    id: str
    text: str
    metadata: dict


class ChatResponse(BaseModel):
    answer: str
    sources: list[SourceChunk]