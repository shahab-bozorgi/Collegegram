import { AppDataSource } from "../../../data-source";
import { Email } from "../../../data/email";
import { Password } from "../../../modules/user/model/user-password";
import { UserId } from "../../../modules/user/model/user-user-id";
import { Username } from "../../../modules/user/model/user-username";
import { User } from "../../../modules/user/model/user.model";
import { UserRepository } from "../../../modules/user/user.repository";

let userRepo: UserRepository;
let user: User;
beforeAll(async () => {
  const dataSource = await AppDataSource.setOptions({
    dropSchema: true,
  }).initialize();

  userRepo = new UserRepository(dataSource);
  user = await userRepo.create({
    username: "testUser" as Username,
    password: "Pass1234" as Password,
    email: "abc@gmail.com" as Email,
  });
});

afterAll(async () => await AppDataSource.destroy());

describe("Update user", () => {
  const newInfo = {
    username: "newUsername" as Username,
    password: "newPassword" as Password,
    bio: "newBio",
    isPrivate: true,
  };

  it("Should return true if update was done.", async () => {
    await userRepo.update({ ...user, ...newInfo });
    const updatedUser = await userRepo.findByEmail(user.email);
    expect(updatedUser?.username).toBe(newInfo.username);
    expect(updatedUser?.password).toBe(newInfo.password);
    expect(updatedUser?.bio).toBe(newInfo.bio);
    expect(updatedUser?.isPrivate).toBe(newInfo.isPrivate);
  });
});
