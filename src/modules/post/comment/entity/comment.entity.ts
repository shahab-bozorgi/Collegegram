import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { CommentId } from "../model/comment-id";
import { NoneEmptyString } from "../../../../data/non-empty-string";
import { LikeCommentEntity } from "../like-comment/entity/like-comment.entity";
import { PostId } from "../../model/post-id";
import { UserId } from "../../../user/model/user-user-id";
import { UserEntity } from "../../../user/entity/user.entity";
import { PostEntity } from "../../entity/post.entity";

@Entity("comments")
export class CommentEntity {
  @PrimaryColumn("uuid")
  id!: CommentId;

  @Column()
  userId!: UserId;

  @Column()
  postId!: PostId;

  @Column({ nullable: true, type: "text" })
  parentId!: CommentId | null;

  @ManyToOne(() => UserEntity, (user) => user.comments, {
    nullable: false,
    onDelete: "CASCADE",
  })
  user!: UserEntity;

  @ManyToOne(() => PostEntity, (post) => post.comments, {
    nullable: false,
    onDelete: "CASCADE",
  })
  post!: PostEntity;

  @ManyToOne(() => CommentEntity, (comment) => comment.replies, {
    nullable: true,
    onDelete: "CASCADE",
  })
  parentComment!: CommentEntity | null;

  @OneToMany(() => CommentEntity, (comment) => comment.parentComment)
  replies!: CommentEntity[];

  @Column()
  description!: NoneEmptyString;

  @OneToMany(() => LikeCommentEntity, (likeComment) => likeComment.comment)
  likeComments!: LikeCommentEntity[];

  @Column({ default: 0 })
  likeCommentsCount!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
