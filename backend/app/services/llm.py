from openai import OpenAI
from app.config import settings
from datetime import datetime
import re

class LLMService:
    def __init__(self):
        self.client = OpenAI(api_key=settings.OPENAI_API_KEY)
        self.model = settings.LLM_MODEL
        self.current_date = datetime.now()

    def generate(self, prompt: str, context: str = "", formatted_prompt: str = None) -> str:
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

            📋 **CẤU TRÚC PROMPT:**

            User sẽ gửi prompt theo format:

            [LỊCH SỬ HỘI THOẠI]
            <các câu hỏi và câu trả lời trước đó nếu có>
            Người dùng: <câu hỏi trước>
            AI Bot: <câu trả lời trước>
            Người dùng: <câu hỏi trước>
            AI Bot: <câu trả lời trước>
            ...

            [CÂU HỎI HIỆN TẠI]
            <câu hỏi mới ở thời điểm này>
            
            [CONTEXT TỪ TÀI LIỆU]
            <nội dung tài liệu liên quan nếu có>
            Hãy sử dụng thông tin từ [CONTEXT TỪ TÀI LIỆU] để trả lời câu hỏi một cách chính xác nhất.
            💬 Trả lời ngắn gọn, hữu ích, luôn kết thúc bằng CTA (call-to-action).
            Nếu không biết, hãy thẳng thắn nói "Mình không chắc về điều đó, nhưng bạn có thể tham khảo trang Facebook của Dự Án Cho EM để biết thêm chi tiết nhé!"
            
            Thông tin hữu ích:
            - Ngày hiện tại: {current_date_str}
            Hãy chú ý mốc thời gian để cung cấp thông tin chính xác nhất!
            '''.strip()   
        
        date_context = f"\n\n[THỜI GIAN] Ngày hiện tại: {current_date_str}" 
            
        if formatted_prompt:
            # Có history → append date vào cuối
            user_content = formatted_prompt.rstrip() + date_context
            if context:
                user_content += f"\n\n[CONTEXT TỪ TÀI LIỆU]\n{context}"
        else:
            # Không history → thêm date vào prompt
            if context:
                user_content = f"[CONTEXT]\n{context}\n\n[CÂU HỎI] {prompt}{date_context}"
            else:
                user_content = f"[CÂU HỎI] {prompt}{date_context}"
                    
        response = self.client.responses.create(
            model=self.model,
            input=[
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_content}
            ]
        )
        return response.output_text