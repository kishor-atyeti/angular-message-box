import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:4000');
  }

  sentMessage(msg: string) {
    this.socket.emit('trigger-message', msg);
  }

  getMessages() {
    return new Observable((observer)=> {
      this.socket.on('trigger-message', (msg:string) => {
        console.log(msg);
        observer.next(void 0);
      });
    })
  }
}
