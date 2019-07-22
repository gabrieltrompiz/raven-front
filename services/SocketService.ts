import { User } from './../types';
import io from 'socket.io-client';
import { fromEvent, Observable, Subscriber } from 'rxjs'
import { ChatMessage } from '../types'

export class SocketService {
  private server: string = require('../config.json').server;
  private socket: SocketIOClient.Socket = {} as SocketIOClient.Socket;

  public init (): SocketService {
    this.socket = io(this.server + 'chat');
    return this;
  }

  public sendMessage (message: ChatMessage): void {
    this.socket.emit('message', message);
  }

  public onRelog (): Observable<string> {
    return fromEvent(this.socket, 'relog');
  }

  public onMessage (): Observable<ChatMessage> {
    return fromEvent(this.socket, 'message');
  }

  public disconnect (): void {
    this.socket.disconnect();
  }
}