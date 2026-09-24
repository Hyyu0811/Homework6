// src/api/OpenRouterError.js
export class OpenRouterError extends Error {
  constructor(message, status) {
    super(message); // Gọi super() để Error chuẩn xử lý message
    this.name = "OpenRouterError"; // Ghi đè name mặc định ("Error")
    this.status = status; // Bổ sung mã HTTP status
  }
}