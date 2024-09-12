import { DataSource, Repository } from "typeorm";
import { MessageEntity } from "./entity/message-entity";
import { UserId } from "../model/user-user-id";
import { Message } from "./model/message-model";
import { UserEntity } from "../entity/user.entity";

export interface IMessageRepository {
  saveMessage(
    senderId: UserId,
    receiverId: UserId,
    content: string
  ): Promise<Message>;
  getMessagesBetweenUsers(userId1: UserId, userId2: UserId): Promise<Message[]>;
}

export class MessageRepository {
  private mesRepo: Repository<MessageEntity>;
  private userRepo: Repository<UserEntity>;

  constructor(private dataSource: DataSource) {
    this.mesRepo = dataSource.getRepository(MessageEntity);
    this.userRepo = dataSource.getRepository(UserEntity); // اضافه کردن repository کاربر
  }

  async saveMessage(
    senderId: UserId,
    receiverId: UserId,
    content: string
  ): Promise<MessageEntity> {
    const sender = await this.userRepo.findOne({ where: { id: senderId } });
    const receiver = await this.userRepo.findOne({ where: { id: receiverId } });

    if (!sender || !receiver) {
      throw new Error("Sender or receiver not found");
    }

    // ایجاد پیام جدید
    const message = this.mesRepo.create({
      senderId: sender.id,
      receiverId: receiver.id,
      content: content,
      sender: sender, 
      receiver: receiver, 
    });

    return await this.mesRepo.save(message);
  }

  async getMessagesBetweenUsers(
    userId1: UserId,
    userId2: UserId
  ): Promise<MessageEntity[]> {
    return this.mesRepo
      .createQueryBuilder("message")
      .where(
        "(message.senderId = :userId1 AND message.receiverId = :userId2) OR (message.senderId = :userId2 AND message.receiverId = :userId1)",
        { userId1, userId2 }
      )
      .orderBy("message.createdAt", "ASC")
      .getMany();
  }
}
