from openai import OpenAI
from app.config import settings


class LLMService:
    def __init__(self):
        self.client = OpenAI(api_key=settings.OPENAI_API_KEY)
        self.model = settings.LLM_MODEL

    def generate(self, prompt: str, context: str = "") -> str:
        """Generate response with optional context"""
        system_prompt = "Bạn là trợ lý AI hữu ích. Trả lời dựa trên context được cung cấp."
        
        if context:
            full_prompt = f"Context:\n{context}\n\nCâu hỏi: {prompt}"
        else:
            full_prompt = prompt

        response = self.client.responses.create(
            model=self.model,
            input=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": full_prompt}
            ]
        )
        return response.output_text