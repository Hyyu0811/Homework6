// src/api/openrouter.js
import { OpenRouterError } from "./OpenRouterError";

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
// Dùng model miễn phí có đuôi :free
const DEFAULT_MODEL = "meta-llama/llama-3.3-70b-instruct";

export async function sendChatMessage(messages, options = {}) {
  // Destructuring tách model ra riêng, gom các option còn lại vào extraOptions
  const { model = DEFAULT_MODEL, ...extraOptions } = options;

  const response = await fetch(OPENROUTER_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": window.location.origin,
      "X-Title": "AI Chatbot Demo",
    },
    body: JSON.stringify({
      model,
      messages,
      ...extraOptions,
    }),
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => null);
    throw new OpenRouterError(
      errorBody?.error?.message ?? `Lỗi HTTP ${response.status}`,
      response.status
    );
  }

  const data = await response.json();
  // Optional chaining & nullish coalescing chống crash nếu response thiếu dữ liệu
  return data?.choices?.[0]?.message?.content ?? "";
}