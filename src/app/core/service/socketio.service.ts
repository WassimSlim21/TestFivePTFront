import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class SocketioService {
  socket: any;

  constructor() { }
  setupSocketConnection() {
    this.socket = io(environment.SOCKET_ENDPOINT);
    this.socket.emit('my message', JSON.parse(localStorage.getItem('account')).userName + 'is connected');
    this.socket.on('my broadcast', (data: string) => {
      console.log(data);
    });
/*
    this.socket = io(environment.SOCKET_ENDPOINT, {
      query: {
        token: 'cde'
      }
    });
*/

  }



}
