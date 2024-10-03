// src/socketManager.ts
import { Server, Socket } from 'socket.io';
import jwt from 'jsonwebtoken';
import { IConnectedUser } from './interfaces/IConnectedUser';
import { redisSubscriber } from './redisSubscriber';
import { redisQueue } from './redisQueue'
import _const from "./_const";

export class SocketManager {
    private connectedUsers: IConnectedUser[] = [];
    private io: Server;
    private secretKey: string;
    private redisQueue: redisQueue;
    private rSubscriber: redisSubscriber; // Redis subscriber instance

    constructor(io: Server, secretKey: string, redisUrl: string) {
        this.io = io;
        this.secretKey = secretKey;
        this.redisQueue = new redisQueue(redisUrl);
        this.rSubscriber = new redisSubscriber(this.connectedUsers, this.redisQueue, redisUrl); // Pass the method binding
        this.rSubscriber.connect();
        this.initialize();
    }

    private initialize = () => {
        this.io.use((socket, next) => {
            const token = socket.handshake.auth.token;

            if (token) {
                jwt.verify(token, this.secretKey, (err: jwt.VerifyErrors | null, decoded: any) => {
                    if (err) {
                        return next(new Error('Authentication error'));
                    }
                    socket.data.userId = decoded.userId; // Store userId in socket
                    next();
                });
            } else {
                next(new Error('Authentication error'));
            }
        });

        this.io.on(_const.wsocketEvent.connection, (socket) => {
            const userId = socket.data.userId;

            // Add user to the connected users list
            this.addUser(userId, socket);

            // Send a welcome notification
            socket.emit('notification', `[notification] User ${userId}!`);

            socket.on(_const.wsocketEvent.disconnect, () => {
                this.removeUser(userId);
            });
        });
    };

    public addUser = (userId: string, socket: Socket): void => {

        console.log(`addUser ==> User id ${userId} connected.`);
        const existingUser = this.connectedUsers.find(user => user.userId === userId);

        if (!existingUser) {
            this.connectedUsers.push({ userId, socket });
            console.log(`User id [${userId}] connected.`);

            // read queue and send push message
            this.sendQueueNotificationsToUser(userId, socket);
        } 
        else {
            console.log(`User id [${userId}],  exist!`);
        }
    };

    public sendQueueNotificationsToUser = async (userId: string, socket: Socket): Promise<void> => {
        try {
            const notifications = await this.redisQueue.getNotifications(userId);
            if (notifications.length > 0) {
                socket.emit(_const.notification.push, notifications); // Emit notifications to the user
                console.log(`Sent notifications to user ${userId}:`, notifications);
            } else {
                console.log(`No notifications for user ${userId}.`);
            }
        } catch (error) {
            console.error(`Failed to fetch notifications for user ${userId}:`, error);
            socket.emit('error', 'Failed to fetch notifications.');
        }
    };

    public removeUser = (userId: string): void => {
        const index = this.connectedUsers.findIndex(user => user.userId === userId);
        if (index !== -1) {
            this.connectedUsers.splice(index, 1);
            this.io.emit('userList', this.connectedUsers.map(user => user.userId)); // Broadcast updated user list
            console.log(`User id ${userId} disconnected.`);
        }
    };

    public sendMessageToUser = (userId: string, message: string): void => {
        const user = this.connectedUsers.find(user => user.userId === userId);
        if (user) {
            user.socket.emit('message', message);
            console.log(`Sent message to user id ${userId}: ${message}`);
        } else {
            console.log(`User with ID ${userId} is not connected.`);
        }
    };

}
