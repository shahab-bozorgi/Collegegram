import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { Email } from "../../../data/email";
import { Username } from "../model/user-username";
import { Password } from "../model/user-password";
import { UserId } from "../model/user-user-id";
import { FollowEntity } from "../follow/entity/follow.entity";
import { MediaEntity } from "../../media/media.entity";
import { PostEntity } from "../../post/entity/post.entity";
import { CommentEntity } from "../../post/comment/entity/comment.entity";
import { LikeCommentEntity } from "../../post/comment/like-comment/entity/like-comment.entity";
import { BookmarkEntity } from "../../post/bookmark/entity/bookmark.entity";
import { LikePostEntity } from "../../post/like-post/entity/like-post-entity";
import { MessageEntity } from "../message/entity/message-entity";

@Entity("users")
export class UserEntity {
  @PrimaryColumn("uuid")
  id!: UserId;

  @Column({ nullable: true })
  firstName!: string;

  @Column({ nullable: true })
  lastName!: string;

  @Column({ unique: true })
  email!: Email;

  @Column({ unique: true })
  username!: Username;

  @Column()
  password!: Password;

  @Column({ nullable: true })
  bio!: string;

  @Column({ default: false })
  isPrivate!: boolean;

  @OneToMany(() => PostEntity, (post) => post.author)
  posts!: PostEntity[];

  @OneToMany(() => CommentEntity, (comment) => comment.user)
  comments!: CommentEntity[];

  @OneToMany(() => LikeCommentEntity, (likeComment) => likeComment.user)
  likeComments!: LikeCommentEntity[];

  @OneToMany(() => LikePostEntity, (likePost) => likePost.user)
  likePosts!: LikePostEntity[];

  @OneToOne(() => MediaEntity, { onDelete: "SET NULL" })
  @JoinColumn()
  avatar!: MediaEntity;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(() => FollowEntity, (follow) => follow.follower)
  following!: FollowEntity[];

  @OneToMany(() => FollowEntity, (follow) => follow.following)
  followers!: FollowEntity[];

  @OneToMany(() => BookmarkEntity, (bookmark) => bookmark.post)
  bookmarks!: BookmarkEntity[];

  @OneToMany(() => MessageEntity, (message) => message.sender)
  sentMessages!: MessageEntity[];

  @OneToMany(() => MessageEntity, (message) => message.receiver)
  receivedMessages!: MessageEntity[];
  
}
