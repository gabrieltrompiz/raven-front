import { NavigationScreenProp, NavigationParams } from "react-navigation";

export interface ChatProps {
  user?: User,
  group?: any,
  messages: ChatMessage [],
  navigation: NavigationScreenProp<{}, NavigationParams>,
  id: number
}

export interface User {
  pictureUrl: string;
  id: number,
  name: string,
  username: string,
  email: string,
  status: string
}

export interface ChatMessage {
  id: number,
  user: User,
  attachment: string,
  body: string,
  time: number,
  to: number,
  type: number
}

export interface ChatHeaderProps {
  name: string, 
  navigation: NavigationScreenProp<{}, NavigationParams>,
  preview?: boolean
}

export interface SocketMessage {
  to: number,
  attachment?: string,
  body: string,
  type: number
}

export interface ContactProps {
  user: User,
  status: string,
  toggle?: boolean,
  action?: Function
}