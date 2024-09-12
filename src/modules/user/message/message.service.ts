import { MessageRepository } from "./message-repository";
import { MessageEntity } from "./entity/message-entity";
import { UserId } from "../model/user-user-id";

export class MessageService {
  constructor(private messageRepository: MessageRepository) {}

  async createMessage(
    senderId: UserId,
    receiverId: UserId,
    content: string
  ): Promise<MessageEntity> {
    const message = new MessageEntity();
    message.senderId = senderId;
    message.receiverId = receiverId;
    message.content = content;

    return this.messageRepository.saveMessage(
      message.senderId,
      message.receiverId,
      message.content
    );
  }

  async getMessagesBetweenUsers(
    userId1: UserId,
    userId2: UserId
  ): Promise<MessageEntity[]> {
    return this.messageRepository.getMessagesBetweenUsers(userId1, userId2);
  }
}






// export class MessageService {
//   constructor(
//     private messageRepository: MessageRepository,
//     private wsServer: WebSocket.Server
//   ) {}

  // async saveMessage(
  //   senderId: UserId,
  //   receiverId: UserId,
  //   content: string
  // ): Promise<Message> {
  //   const messageEntity = new MessageEntity();
  //   messageEntity.senderId = senderId;
  //   messageEntity.receiverId = receiverId;
  //   messageEntity.content = content;

  //   const savedMessage = await this.messageRepository.save(messageEntity);

  //   this.sendMessageToUser(receiverId, JSON.stringify({ senderId, content }));

  //   return {
  //     id: savedMessage.id,
  //     senderId: savedMessage.senderId,
  //     receiverId: savedMessage.receiverId,
  //     content: savedMessage.content,
  //     createdAt: savedMessage.createdAt,
  //   };
  // }

  // private sendMessageToUser(userId: UserId, message: string) {
  //   const sockets = Array.from(this.wsServer.clients) as WebSocket[];
  //   const socket = sockets.find(
  //     (ws) => ws.readyState === WebSocket.OPEN && (ws as any).userId === userId
  //   );
  //   if (socket) {
  //     socket.send(message);
  //   } else {
  //     console.log(`User ${userId} is not connected`);
  //   }
  // }


