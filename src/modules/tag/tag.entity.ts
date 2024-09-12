import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TagId } from "./field-types/tag-id";
import { TagTitle } from "./field-types/tag-title";
import { PostEntity } from "../post/entity/post.entity";

@Entity("tags")
export class TagEntity {
  @PrimaryGeneratedColumn()
  id!: TagId;

  @Index({ unique: true })
  @Column({})
  title!: TagTitle;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToMany(() => PostEntity)
  posts!: PostEntity[];
}
