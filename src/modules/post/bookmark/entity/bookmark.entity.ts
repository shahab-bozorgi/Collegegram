import { CreateDateColumn, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { PostId } from "../../model/post-id";
import { UserId } from "../../../user/model/user-user-id";
import { UserEntity } from "../../../user/entity/user.entity";
import { PostEntity } from "../../entity/post.entity";

@Entity("bookmarks")
export class BookmarkEntity {
  @PrimaryColumn()
  userId!: UserId;

  @PrimaryColumn()
  postId!: PostId;

  @ManyToOne(() => UserEntity, (user) => user.bookmarks, {
    nullable: false,
    onDelete: "CASCADE",
  })
  user!: UserEntity;

  @ManyToOne(() => PostEntity, (post) => post.bookmarks, {
    nullable: false,
    onDelete: "CASCADE",
  })
  post!: PostEntity;

  @CreateDateColumn()
  createdAt!: Date;
}
