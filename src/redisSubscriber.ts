//const { createClient } from 'redis';
import { createClient } from 'redis';
import { redisQueue } from './redisQueue'
import { IConnectedUser } from "./interfaces/IConnectedUser";

const sec24hr = 864000;
const channel = 'notification_channel';

export class redisSubscriber {

    constructor(connectedUsers: IConnectedUser[], queue: redisQueue, redisUrl: string) {

        console.log('redisSubscriber constructor');
        this.connectedUsers = connectedUsers;
        this.subscriber = createClient({ url: redisUrl });
        this.redisQueue = queue;


        this.subscriber.on('error', (err) => {
            console.error('Redis error: ', err);
        });
    }

    connect = async () => {
        try {
            console.log('redisSubscriber connect');

            await this.subscriber.connect();
            console.log('Connected to Redis for publishing...');


            await this.subscriber.subscribe(channel, async (message) => {
                //console.log(`Received message from ${channel}: ${message}`);
                try {
                    const noticeObject = JSON.parse(message);
                    console.log(`userId:[${noticeObject.userId}], id:[${noticeObject.id}], name:[${noticeObject.name}], type:[${noticeObject.type}]`);
                    console.log(`status:[${noticeObject.status}], content:[${noticeObject.content}], expireDate:[${noticeObject.expireDate}]`);

                    // send message to connected user
                    if (!this.sendNotificationToUser(unoticeObject.userId, message)) {
                        this.redisQueue.add(noticeObject.userId, noticeObject.type + noticeObject.id, message);
                    }
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                }
            });
            

        } catch (err) {
            console.error('Failed to connect:', err);
        }
    }

    // Function to send message to a specific user
    sendNotificationToUser = (userId: string, message: string) => {
        const user = this.connectedUsers.find(user => user.userId === userId);
        if (user) {
            user.socket.emit('message', message);
            return true;
        } else {
            console.log(`User with ID ${userId} is not connected.`);
            return false;
        }
    };

    sendBroadcastNotification = (message: string) => {
        io.emit('broadcast', message);
    };

    // async disconnect() {
    disconnect = async () => {
        await this.subscriber.quit();
        console.log('Disconnected from Redis.');
    }
}
