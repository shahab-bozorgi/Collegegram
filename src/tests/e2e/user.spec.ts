import request from "supertest";
import { Express } from "express";
import { makeApp } from "../../api";
import { AppDataSource } from "../../data-source";
import { Username } from "../../modules/user/model/user-username";
import { Password } from "../../modules/user/model/user-password";
import { signUpUserTest } from "./utility";
import { Email } from "../../data/email";
import { DataSource } from "typeorm";

describe("User test suite", () => {
  let app: Express;
  let dataSource: DataSource;

  beforeAll(async () => {
    dataSource = await AppDataSource.initialize();
    app = makeApp(dataSource);
  });

  afterAll(async () => {
    await dataSource.destroy();
  });

  describe("Sign-up", () => {
    it("should sign up user if username & emial is unique", async () => {
      await request(app)
        .post("/auth/sign-up")
        .send({
          username: "shahab",
          email: "shahab@gmail.com",
          password: "Password1",
          confirmPassword: "Password1",
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);
    });
  });

  describe("Login", () => {
    it("should user login if username and password is correct", async () => {
      await signUpUserTest(app, {
        username: "amir" as Username,
        email: "amir@gmail.com" as Email,
        password: "Password1" as Password,
        confirmPassword: "Password1" as Password,
      });

      await request(app)
        .post("/auth/login")
        .send({
          username: "amir",
          password: "Password1",
        })
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200);
    });
  });
});
