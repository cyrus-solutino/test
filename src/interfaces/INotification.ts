
export interface INotification {
    userId?: string;
    id?: string;           // Notification ID / Document ID
    name?: string          // "doc upload", "doc process", "info" 
    type: string;          // Notification type (state / non-state)
    status: string;        // Notification status / processState (state: uploaded, process, finished / non-state: '')
    //ack: number;           // Acknowledgment (1 = acknowledged, 0 = not acknowledged)
    content: string;       // Notification content
    //date: string;          // Date when the notification happened (ISO string)
    expireDate: string;    // Expiry date of the notification (ISO string)
  }