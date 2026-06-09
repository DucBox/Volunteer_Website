import logging
import logging.config
import os
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from app.api.routes import documents, chat, content

logging.config.dictConfig({
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {
        "default": {"format": "%(asctime)s [%(levelname)s] %(name)s: %(message)s"},
    },
    "handlers": {
        "console": {"class": "logging.StreamHandler", "formatter": "default"},
    },
    "root": {"handlers": ["console"], "level": os.getenv("LOG_LEVEL", "INFO")},
})

logger = logging.getLogger(__name__)

limiter = Limiter(key_func=get_remote_address)

app = FastAPI(title="RAG Chatbot API", version="1.0.0")

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://volunteer-website-self.vercel.app",
        "https://admin-dashboard-em-lilac.vercel.app",
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["Content-Type", "Authorization", "X-Admin-Key"],
)


@app.middleware("http")
async def add_security_headers(request: Request, call_next):
    response: Response = await call_next(request)
    response.headers["X-Content-Type-Options"] = "nosniff"
    response.headers["X-Frame-Options"] = "DENY"
    response.headers["Strict-Transport-Security"] = "max-age=31536000; includeSubDomains"
    response.headers["Referrer-Policy"] = "strict-origin-when-cross-origin"
    return response


app.include_router(documents.router)
app.include_router(chat.router)
app.include_router(content.router)


@app.get("/health")
async def health_check():
    issues = []
    if not os.getenv("OPENAI_API_KEY"):
        issues.append("OPENAI_API_KEY not configured")
    if not os.getenv("ADMIN_API_KEY"):
        issues.append("ADMIN_API_KEY not configured")
    try:
        from app.api.dependencies import get_rag_engine
        get_rag_engine()
    except Exception as e:
        issues.append(f"RAG engine unavailable: {e}")
    if issues:
        return {"status": "degraded", "issues": issues}
    return {"status": "ok"}
