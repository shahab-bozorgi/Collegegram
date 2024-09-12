import { compare } from "bcrypt";
import { Email } from "../../../../data/email";
import { Password } from "../../../../modules/user/model/user-password";
import { Username } from "../../../../modules/user/model/user-username";
import { UserService } from "../../../../modules/user/user.service";
import { BadRequest } from "../../../../utilities/http-error";
import { MockUserRepository } from "./mock-dependencies";

let userService: UserService;
describe("UserService", () => {
  const user = {
    username: "testUser" as Username,
    password: "Pass1234" as Password,
    email: "abc@gmail.com" as Email,
  };

  beforeAll(async () => {
    userService = new UserService(new MockUserRepository());
  });

  describe("Create User", () => {
    it("should return user object", async () => {
      const createdUser = await userService.create(user);
      expect(createdUser.username).toBe(user.username);
      expect(await compare(user.password, createdUser.password)).toBe(true);
      expect(createdUser.email).toBe(user.email);
    });

    it("should fail if username already exists", async () => {
      await expect(
        userService.create({
          username: user.username,
          password: "NewPass1234" as Password,
          email: "newemail@gmail.com" as Email,
        })
      ).rejects.toThrow(BadRequest);
    });

    it("should fail if email already exists", async () => {
      await expect(
        userService.create({
          username: "newUser" as Username,
          password: "NewPass1234" as Password,
          email: user.email,
        })
      ).rejects.toThrow(BadRequest);
    });
  });
});
