import {
  Entity,
  ManyToOne,
  JoinColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  Unique,
  PrimaryColumn,
} from "typeorm";
import { UserEntity } from "../../entity/user.entity";
import { UserId } from "../../model/user-user-id";
import { DbFollowingStatus } from "../model/follow.model";

@Entity("follows")
@Unique(["followerId", "followingId"])
export class FollowEntity {
  @PrimaryColumn()
  followerId!: UserId;

  @PrimaryColumn()
  followingId!: UserId;

  @Column()
  followingStatus!: DbFollowingStatus;

  @Column({ default: false })
  isCloseFriend!: boolean;

  @ManyToOne(() => UserEntity, (user) => user.following)
  @JoinColumn()
  follower!: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.followers)
  @JoinColumn()
  following!: UserEntity;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
