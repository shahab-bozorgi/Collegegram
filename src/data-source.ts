import dotenv from "dotenv-flow";
dotenv.config();
import "reflect-metadata";
import { UserEntity } from "./modules/user/entity/user.entity";
import { DataSource } from "typeorm";
import { PasswordResetEntity } from "./modules/password-reset/password-reset.entity";
import { MediaEntity } from "./modules/media/media.entity";
import { PostEntity } from "./modules/post/entity/post.entity";
import { TagEntity } from "./modules/tag/tag.entity";
import { FollowEntity } from "./modules/user/follow/entity/follow.entity";
import { LikeCommentEntity } from "./modules/post/comment/like-comment/entity/like-comment.entity";
import { CommentEntity } from "./modules/post/comment/entity/comment.entity";
import { BookmarkEntity } from "./modules/post/bookmark/entity/bookmark.entity";
import { LikePostEntity } from "./modules/post/like-post/entity/like-post-entity";
import { MessageEntity } from "./modules/user/message/entity/message-entity";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT!,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [
    UserEntity,
    PasswordResetEntity,
    MediaEntity,
    PostEntity,
    FollowEntity,
    TagEntity,
    CommentEntity,
    LikeCommentEntity,
    LikePostEntity,
    BookmarkEntity,
    MessageEntity
  ],
  migrations: [],
  subscribers: [],
  dropSchema: process.env.NODE_ENV === "test",
});
