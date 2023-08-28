export interface ITransaction {
    id: number;
    senderUserId: number;
    receiverUserId: number;
    amount: number;
    timestamp: Date;
  }