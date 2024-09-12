import { v4 } from "uuid";
import {
  CreateUser,
  UpdateUser,
  User,
} from "../../../../modules/user/model/user.model";
import { IUserRepository } from "../../../../modules/user/user.repository";
import { UserId } from "../../../../modules/user/model/user-user-id";
import { Username } from "../../../../modules/user/model/user-username";
import { Email } from "../../../../data/email";
import { UserEntity } from "../../../../modules/user/entity/user.entity";

export class MockUserRepository implements IUserRepository {
  save(user: UserEntity): Promise<UserEntity> {
    throw new Error("Method not implemented.");
  }
  private users: User[] = [];

  async create(user: CreateUser): Promise<User> {
    const newUser = { ...user, id: v4() as UserId };
    this.users.push(newUser);
    return newUser;
  }

  update(user: UpdateUser): Promise<User> {
    throw new Error("Method not implemented.");
  }

  async findById(id: UserId): Promise<User | null> {
    return this.users.find((user) => user.id === id) ?? null;
  }

  async findByUsername(username: Username): Promise<User | null> {
    return this.users.find((user) => user.username === username) ?? null;
  }

  async findByEmail(email: Email): Promise<User | null> {
    return this.users.find((user) => user.email === email) ?? null;
  }

  whereUsernameIn(usernames: Username[]): Promise<User[]> {
    throw new Error("Method not implemented.");
  }
}
