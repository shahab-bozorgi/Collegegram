import { DataSource, In, Repository } from "typeorm";
import { UpdateUser, User } from "../user/model/user.model";
import { CreateUser } from "../user/model/user.model";
import { UserEntity } from "./entity/user.entity";
import { Username } from "./model/user-username";
import { Email } from "../../data/email";
import { UserId } from "./model/user-user-id";
import { v4 } from "uuid";

export interface IUserRepository {
  create(user: CreateUser): Promise<User>;
  update(user: UpdateUser): Promise<User>;
  findById(id: UserId, relations?: string[]): Promise<User | null>;
  findByUsername(
    username: Username,
    relations?: string[]
  ): Promise<User | null>;
  findByEmail(email: Email, relations?: string[]): Promise<User | null>;
  whereUsernameIn(usernames: Username[]): Promise<User[]>;
  save(user: UserEntity): Promise<UserEntity>;
}

export class UserRepository implements IUserRepository {
  private repo: Repository<UserEntity>;

  constructor(dataSource: DataSource) {
    this.repo = dataSource.getRepository(UserEntity);
  }

  async create(user: CreateUser): Promise<User> {
    return await this.repo.save({ ...user, id: v4() });
  }

  async update(user: UpdateUser): Promise<User> {
    return await this.repo.save(user);
  }
  async save(user: UserEntity): Promise<UserEntity> {
    return await this.repo.save(user);
  }

  async findById(id: UserId, relations?: string[]): Promise<UserEntity | null> {
    return await this.repo.findOne({
      where: { id },
      relations,
    });
  }

  async findByUsername(
    username: Username,
    relations?: string[]
  ): Promise<User | null> {
    return await this.repo.findOne({ where: { username }, relations });
  }

  async findByEmail(email: Email, relations?: string[]): Promise<User | null> {
    return await this.repo.findOne({ where: { email }, relations });
  }

  async whereUsernameIn(usernames: Username[]): Promise<User[]> {
    return await this.repo.findBy({ username: In(usernames) });
  }
}
