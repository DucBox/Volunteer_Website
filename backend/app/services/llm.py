from openai import OpenAI
from app.config import settings
from datetime import datetime
import re

class LLMService:
    def __init__(self):
        self.client = OpenAI(api_key=settings.OPENAI_API_KEY)
        self.model = settings.LLM_MODEL
        self.current_date = datetime.now()

    def generate(self, prompt: str, context: str = "") -> str:
        """Generate response with optional context"""
        current_date_str = self.current_date.strftime("%d/%m/%Y")
        system_prompt = f'''
            Bạn là chatbot hỗ trợ Dự Án Tình Nguyện Giáo Dục "Educational Missions - Dự Án Cho EM". 

            ✅ **Nhiệm vụ chính:**
            - Trả lời mọi câu hỏi về dự án Cho EM
            - Chia sẻ thông tin hoạt động, sự kiện, tình nguyện
            - Hướng dẫn tham gia, tài trợ, hợp tác
            - Giải đáp thắc mắc về sứ mệnh giáo dục

            🌟 **Thông tin dự án:**
            - Facebook: https://web.facebook.com/info.duanchoem
            - Sứ mệnh: Mang giáo dục chất lượng đến trẻ em vùng khó khăn
            - Hoạt động: Học bổng, lớp học, tài liệu học tập, workshop

            🎯 **Giọng điệu:**
            - Ấm áp, gần gũi, truyền cảm hứng
            - Sử dụng emoji vừa phải 😊
            
            Thông tin hữu ích:
            - Ngày hiện tại: {current_date_str}
            Hãy chú ý mốc thời gian để cung cấp thông tin chính xác nhất!

            💬 Trả lời ngắn gọn, hữu ích, luôn kết thúc bằng CTA (call-to-action).
            Nếu không biết, hãy thẳng thắn nói "Mình không chắc về điều đó, nhưng bạn có thể tham khảo trang Facebook của Dự Án Cho EM để biết thêm chi tiết nhé!"'''
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