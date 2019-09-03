import { User, SocketMessage } from './../types';
import io from 'socket.io-client';
import { fromEvent, Observable, Subscriber } from 'rxjs'
import { ChatMessage } from '../types'

export class SocketService {
  private server: string = require('../config.json').server;
  private chat: SocketIOClient.Socket = {} as SocketIOClient.Socket;
  private profile: SocketIOClient.Socket = {} as SocketIOClient.Socket;

  public init (): SocketService {
    this.chat = io(this.server + 'chat');
    this.profile = io(this.server + 'profile')
    return this;
  }

  public sendMessage (message: SocketMessage): void {
    this.chat.emit('message', message);
  }

  public createGroup (group: any): void {
    this.chat.emit('create group', group)
  }
  
  public createChannel (channel: any): void {
    this.chat.emit('create channel', channel)
  }

  public search (query: string): void {
    this.profile.emit('search', query)
  }

  public onRelog (): Observable<string> {
    return fromEvent(this.chat, 'relog');
  }

  public onMessage (): Observable<ChatMessage> {
    return fromEvent(this.chat, 'message');
  }

  public onGroupAdd (): Observable<any> {
    return fromEvent(this.chat, 'added to group')
  }

  public onChannelAdd () : Observable<any> {
    return fromEvent(this.chat, 'added to channel')
  }

  public onSearch (): Observable<User[]> {
    return fromEvent(this.profile, 'search')
  }

  public disconnect (): void {
    this.chat.disconnect();
    this.profile.disconnect();
  }
}