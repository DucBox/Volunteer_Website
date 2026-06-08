# Em Bot - RAG Chatbot

## Setup

1. cp .env.example .env
2. Fill API keys
3. uvicorn app.main:app --reload

## Endpoints

- POST /api/documents/upload
- GET  /api/documents
- GET  /api/documents/{doc_id}/content
- DELETE /api/documents/{doc_id}
- POST /api/chat
