// src/components/ChatBox.jsx
import { useState } from "react";
import { sendChatMessage } from "../api/openrouter";
import { OpenRouterError } from "../api/OpenRouterError";

function ChatBox() {
  const [messages, setMessages] = useState([
    {
      id: crypto.randomUUID(),
      role: "assistant",
      content: "Xin chào! Tôi có thể giúp gì cho bạn?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSend() {
    const text = input.trim();
    if (!text || loading) return;

    const userMessage = { id: crypto.randomUUID(), role: "user", content: text };
    
    // Spread operator: Tạo mảng mới, giữ nguyên mảng cũ
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setError("");
    setLoading(true);

    try {
      // Rest operator: Lược bỏ "id" vì OpenRouter chỉ cần "role" và "content"
      const apiHistory = nextMessages.map(({ id, ...apiMessage }) => apiMessage);
      const replyText = await sendChatMessage(apiHistory);

      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), role: "assistant", content: replyText },
      ]);
    } catch (err) {
      const message =
        err instanceof OpenRouterError
          ? `Lỗi từ OpenRouter (${err.status}): ${err.message}`
          : "Không thể kết nối tới AI Service. Vui lòng kiểm tra mạng và thử lại.";
      setError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="chat-box">
      <div className="chat-messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`chat-bubble chat-bubble-${msg.role}`}>
            {msg.content}
          </div>
        ))}
        {loading && (
          <div className="chat-bubble chat-bubble-assistant">Đang trả lời...</div>
        )}
      </div>

      {error && <p className="chat-error">{error}</p>}

      <div className="chat-input-row">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          placeholder="Nhập câu hỏi..."
          disabled={loading}
        />
        <button onClick={handleSend} disabled={loading}>
          Gửi
        </button>
      </div>
    </div>
  );
}

export default ChatBox;