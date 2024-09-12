import request from "supertest";
import { Express } from "express";
import { makeApp } from "../../api";
import { AppDataSource } from "../../data-source";
import { DataSource } from "typeorm";
import { loginUserTest, signUpUserTest } from "./utility";
import { Username } from "../../modules/user/model/user-username";
import { Email } from "../../data/email";
import { Password } from "../../modules/user/model/user-password";

describe("Edit Profile", () => {
  let app: Express;
  let token: string;
  let dataSource: DataSource;

  beforeAll(async () => {
    dataSource = await AppDataSource.initialize();
    app = makeApp(dataSource);

    await signUpUserTest(app, {
      username: "testUser" as Username,
      email: "abc@g.com" as Email,
      password: "Pass1234" as Password,
      confirmPassword: "Pass1234" as Password,
    });

    token = await loginUserTest(app, {
      username: "testUser" as Username,
      password: "Pass1234" as Password,
    });
  });

  afterAll(async () => {
    await dataSource.destroy();
  });

  it("should fail if user is not logged in.", async () => {
    await request(app).patch("/users/profile").send().expect(401);
  });

  const updateInfo = {
    firstName: "Garshasb",
    lastName: "Tahamtan",
    bio: "This bio expresses me.",
  };

  it("should update profile info.", async () => {
    await request(app)
      .patch("/users/profile")
      .send(updateInfo)
      .set("Accept", "application/json")
      .set({
        Authorization: `Bearer ${token}`,
      })
      .expect(200);
  });

  it("should login with older password", async () => {
    const { body: tokenResponse } = await request(app)
      .post("/auth/login")
      .send({
        username: "testUser",
        password: "Pass1234",
      })
      .set("Accept", "application/json")
      .expect(200);

    token = tokenResponse.data;
  });

  it("should update password", async () => {
    await request(app)
      .patch("/users/profile")
      .set("Accept", "application/json")
      .set({
        Authorization: `Bearer ${token}`,
      })
      .send({
        password: "Garsh1234",
        confirmPassword: "Garsh1234",
      })
      .set("Accept", "application/json")
      .expect(200);
  });

  it("should login with new password", async () => {
    const { body: tokenResponse } = await request(app)
      .post("/auth/login")
      .send({
        username: "testUser",
        password: "Garsh1234",
      })
      .set("Accept", "application/json")
      .expect(200);

    token = tokenResponse.data;
  });

  it("updated info should be correct.", async () => {
    const { body: userInfo } = await request(app)
      .get("/users/profile")
      .set("Accept", "application/json")
      .set({
        Authorization: `Bearer ${token}`,
      })
      .expect(200);

    expect(userInfo.data.firstName).toBe(updateInfo.firstName);
    expect(userInfo.data.lastName).toBe(updateInfo.lastName);
    expect(userInfo.data.bio).toBe(updateInfo.bio);
    expect(userInfo.data.username).toBe("testUser");
    expect(userInfo.data.email).toBe("abc@g.com");
    expect(userInfo.data.isPrivate).toBe(false);
  });
});
