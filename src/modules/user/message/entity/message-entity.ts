import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { UserId } from "../../model/user-user-id";
import { UserEntity } from "../../entity/user.entity";

@Entity()
export class MessageEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  senderId!: UserId;

  @Column()
  receiverId!: UserId;

  @Column("text")
  content!: string;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt!: Date;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.sentMessages)
  sender!: UserEntity;

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.receivedMessages)
  receiver!: UserEntity;
}
