from pydantic import BaseModel


class IngestResponse(BaseModel):
    doc_id: str
    doc_name: str
    chunks: int


class DocumentInfo(BaseModel):
    doc_id: str
    doc_name: str
    file_name: str


class DeleteResponse(BaseModel):
    message: str
    doc_id: str