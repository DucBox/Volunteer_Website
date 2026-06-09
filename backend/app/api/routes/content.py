import os
import json
import base64
import logging
import httpx
from io import BytesIO
from typing import Optional
from fastapi import APIRouter, UploadFile, File, Form, HTTPException, Depends, Request
from slowapi import Limiter
from slowapi.util import get_remote_address
from PIL import Image
from app.api.dependencies import verify_admin_key

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/api/content", tags=["Content"])
limiter = Limiter(key_func=get_remote_address)

GITHUB_TOKEN = os.getenv("GITHUB_TOKEN", "")
GITHUB_REPO  = os.getenv("GITHUB_REPO", "")
GITHUB_BRANCH = os.getenv("GITHUB_BRANCH", "master")
CONTENT_JSON_PATH = "frontend/website/data/content.json"

ALLOWED_IMAGE_TYPES = {"image/jpeg", "image/png", "image/webp"}
MAX_IMAGE_SIZE = 10 * 1024 * 1024  # 10MB
ALLOWED_DEST_PREFIX = "frontend/website/assets/images/"


def github_headers():
    return {
        "Authorization": f"Bearer {GITHUB_TOKEN}",
        "Accept": "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
    }


async def get_file_sha(path: str) -> Optional[str]:
    """Get current SHA of a file in GitHub repo (needed for updates)."""
    url = f"https://api.github.com/repos/{GITHUB_REPO}/contents/{path}"
    async with httpx.AsyncClient() as client:
        r = await client.get(url, headers=github_headers(), params={"ref": GITHUB_BRANCH})
    if r.status_code == 200:
        return r.json().get("sha")
    return None


async def github_put_file(path: str, content_bytes: bytes, message: str, sha: Optional[str] = None):
    """Create or update a file in GitHub repo."""
    url = f"https://api.github.com/repos/{GITHUB_REPO}/contents/{path}"
    body = {
        "message": message,
        "content": base64.b64encode(content_bytes).decode(),
        "branch": GITHUB_BRANCH,
    }
    if sha:
        body["sha"] = sha

    async with httpx.AsyncClient(timeout=30) as client:
        r = await client.put(url, headers=github_headers(), json=body)

    if r.status_code not in (200, 201):
        logger.error("GitHub API error: %s %s", r.status_code, r.text)
        raise HTTPException(status_code=502, detail="GitHub API error")


@router.get("", dependencies=[Depends(verify_admin_key)])
async def get_content():
    """Fetch current content.json from GitHub."""
    url = f"https://api.github.com/repos/{GITHUB_REPO}/contents/{CONTENT_JSON_PATH}"
    async with httpx.AsyncClient() as client:
        r = await client.get(url, headers=github_headers(), params={"ref": GITHUB_BRANCH})
    if r.status_code != 200:
        raise HTTPException(status_code=502, detail="Cannot fetch content from GitHub")
    raw = base64.b64decode(r.json()["content"])
    return json.loads(raw)


@router.post("/update", dependencies=[Depends(verify_admin_key)])
@limiter.limit("10/minute")
async def update_content(request: Request, payload: dict, section: str = ""):
    """Replace content.json on GitHub with new payload."""
    if not GITHUB_TOKEN or not GITHUB_REPO:
        raise HTTPException(status_code=500, detail="GitHub integration not configured")

    label = section.strip() if section.strip() else "site content"
    new_bytes = json.dumps(payload, ensure_ascii=False, indent=2).encode("utf-8")
    sha = await get_file_sha(CONTENT_JSON_PATH)
    await github_put_file(
        path=CONTENT_JSON_PATH,
        content_bytes=new_bytes,
        message=f"content: update {label} via admin dashboard",
        sha=sha,
    )
    return {"message": "Content updated. Vercel will rebuild in ~1–2 minutes."}


@router.post("/upload-image", dependencies=[Depends(verify_admin_key)])
@limiter.limit("20/minute")
async def upload_image(
    request: Request,
    file: UploadFile = File(...),
    dest_path: str = Form(...),   # e.g. "frontend/website/assets/images/feelings/3.jpg"
    image_type: str = Form("gallery"),  # "gallery" | "feelings" | "member" | "sponsor"
):
    """
    Upload + compress an image to GitHub repo.
    dest_path is relative to repo root.
    Returns the web-accessible path (relative to website root).
    """
    if not GITHUB_TOKEN or not GITHUB_REPO:
        raise HTTPException(status_code=500, detail="GitHub integration not configured")

    if ".." in dest_path or not dest_path.startswith(ALLOWED_DEST_PREFIX):
        raise HTTPException(status_code=400, detail="Invalid destination path")

    if file.content_type not in ALLOWED_IMAGE_TYPES:
        raise HTTPException(status_code=400, detail="Unsupported image type")

    raw = await file.read()
    if len(raw) > MAX_IMAGE_SIZE:
        raise HTTPException(status_code=400, detail="File too large (max 10MB)")

    # Compress + resize based on type
    compressed = compress_image(raw, image_type)

    sha = await get_file_sha(dest_path)
    await github_put_file(
        path=dest_path,
        content_bytes=compressed,
        message=f"chore: upload {image_type} image via admin dashboard",
        sha=sha,
    )

    # Return the path relative to website root (strip "frontend/website/")
    web_path = dest_path.replace("frontend/website/", "", 1)
    return {"path": web_path, "message": "Image uploaded successfully"}


def compress_image(raw: bytes, image_type: str) -> bytes:
    """Compress and resize image based on its usage type."""
    img = Image.open(BytesIO(raw))
    if img.mode in ("RGBA", "LA", "P"):
        img = img.convert("RGB")
    elif img.mode != "RGB":
        img = img.convert("RGB")

    if image_type == "feelings":
        # Square 1080x1080 (same as resize.py)
        target = (1080, 1080)
        img.thumbnail(target, Image.Resampling.LANCZOS)
        canvas = Image.new("RGB", target, (255, 255, 255))
        x = (target[0] - img.width) // 2
        y = (target[1] - img.height) // 2
        canvas.paste(img, (x, y))
        img = canvas
    else:
        # Max 1920px wide (same as compress_img.py)
        if img.width > 1920:
            ratio = 1920 / img.width
            img = img.resize((1920, int(img.height * ratio)), Image.Resampling.LANCZOS)

    out = BytesIO()
    img.save(out, "JPEG", quality=80, optimize=True, progressive=True)
    return out.getvalue()
