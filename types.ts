export interface ChatMessage {
  author: string;
  message: string;
}

export interface ChatProps {
  user: {
    name: string;
    phone: string;
  }
  messages: ChatMessage [];
}

export interface User {
  name: string,
  phone: string
}