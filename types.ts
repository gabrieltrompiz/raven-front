import { NavigationScreenProp, NavigationParams } from "react-navigation";

export interface ChatProps {
  user: User,
  messages: ChatMessage [],
  navigation: NavigationScreenProp<{}, NavigationParams>,
  id: number
}

export interface User {
  name: string,
  phone: string,
  email: string
}

export interface ChatMessage {
  id: number,
  user: User,
  attachment: string,
  body: string,
  time: number,
  chat: number
}