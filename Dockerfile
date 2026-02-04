FROM python:3.11-slim

WORKDIR /workspace

COPY requirements.txt /workspace/requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

COPY backend/ /workspace/

RUN echo "=== WORKSPACE CONTENTS ===" && ls -la /workspace/
RUN echo "=== APP CONTENTS ===" && ls -la /workspace/app/ || echo "app/ not found"

EXPOSE 8000
CMD uvicorn app.main:app --host 0.0.0.0 --port $PORT