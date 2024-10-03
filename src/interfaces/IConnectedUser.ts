import { Server } from 'socket.io';

export interface IConnectedUser {
    userId: string;
    socket: SocketIO.Socket;
}