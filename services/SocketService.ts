import { User, SocketMessage } from './../types';
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

  public sendMessage (message: SocketMessage): void {
    this.socket.emit('message', message);
  }

  public createGroup (group: any): void {
    this.socket.emit('create group', group)
  }

  public onRelog (): Observable<string> {
    return fromEvent(this.socket, 'relog');
  }

  public onMessage (): Observable<ChatMessage> {
    return fromEvent(this.socket, 'message');
  }

  public onGroupAdd (): Observable<any> {
    return fromEvent(this.socket, 'added to group')
  }

  public disconnect (): void {
    this.socket.disconnect();
  }
}