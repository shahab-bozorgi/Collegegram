import { DataSource, Repository } from "typeorm";
import { PasswordReset } from "./password-reset.model";
import { PasswordResetEntity } from "./password-reset.entity";
import { PasswordResetToken } from "./type-guard/token";

export interface IPasswordResetRepository {
  create(fields: PasswordReset): Promise<PasswordReset | null>;
  findToken(token: PasswordResetToken): Promise<PasswordReset | null>;
  deleteToken(token: PasswordResetToken): Promise<boolean>;
}

export class PasswordResetRepository implements IPasswordResetRepository {
  private repo: Repository<PasswordResetEntity>;
  constructor(dataSource: DataSource) {
    this.repo = dataSource.getRepository(PasswordResetEntity);
  }

  async create(fields: PasswordReset): Promise<PasswordReset | null> {
    return await this.repo.save(fields);
  }

  async findToken(token: PasswordResetToken): Promise<PasswordReset | null> {
    return await this.repo.findOne({
      where: { token },
      relations: { user: true },
    });
  }

  async deleteToken(token: PasswordResetToken): Promise<boolean> {
    const result = await this.repo.delete({ token });
    return Boolean(result.affected);
  }
}
