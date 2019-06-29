import io from 'socket.io-client';
import { fromEvent, Observable } from 'rxjs'
import { ChatMessage } from '../types'

export class SocketService {
  private socket: SocketIOClient.Socket = {} as SocketIOClient.Socket;

  public init (): SocketService {
    this.socket = io('localhost:8080');
    return this;
  }

  public sendMessage (message: ChatMessage): void {
    this.socket.emit('message', message);
  }

  public onMessage (): Observable<ChatMessage> {
    return fromEvent(this.socket, 'message');
  }

  public disconnect (): void {
    this.socket.disconnect();
  }
}