import request from "supertest";
import { Express } from "express";
import { makeApp } from "../../api";
import { AppDataSource } from "../../data-source";
import { UserId } from "../../modules/user/model/user-user-id";
import { Username } from "../../modules/user/model/user-username";
import { Password } from "../../modules/user/model/user-password";
import { loginUserTest, signUpUserTest } from "./utility";
import { Email } from "../../data/email";
import { DataSource } from "typeorm";

describe("Follow test suite", () => {
  let app: Express;
  let token: string;
  let followingId: UserId;
  let dataSource: DataSource;
  
  beforeAll(async () => {
    dataSource = await AppDataSource.initialize();
    app = makeApp(dataSource);

    await signUpUserTest(app, {
      username: "omid" as Username,
      email: "omid@gmail.com" as Email,
      password: "Password1" as Password,
      confirmPassword: "Password1" as Password,
    });
    followingId = await signUpUserTest(app, {
      username: "ali" as Username,
      email: "ali@gmail.com" as Email,
      password: "Password1" as Password,
      confirmPassword: "Password1" as Password,
    });

    token = await loginUserTest(app, {
      username: "omid" as Username,
      password: "Password1" as Password,
    });
  });

  afterAll(async () => {
    await dataSource.destroy();
  });

  describe("Follow User", () => {
    it("should follow user if users are exist, follower is logged in and not duplicated follow", async () => {
      await request(app)
        .post(`/users/follow/${followingId}`)
        .set("Accept", "application/json")
        .set({
          Authorization: `Bearer ${token}`,
        })
        .expect("Content-Type", /json/)
        .expect(200);
    });
  });
});
