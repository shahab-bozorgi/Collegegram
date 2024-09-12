import request from "supertest";
import { Express } from "express";
import { Username } from "../../modules/user/model/user-username";
import { Password } from "../../modules/user/model/user-password";
import { Email } from "../../data/email";
import { UserId } from "../../modules/user/model/user-user-id";

export const signUpUserTest = async (
  app: Express,
  user: {
    username: Username;
    password: Password;
    confirmPassword: Password;
    email: Email;
  }
): Promise<UserId> => {
  const response = await request(app)
    .post("/auth/sign-up")
    .send({
      username: user.username,
      email: user.email,
      password: user.password,
      confirmPassword: user.password,
    })
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(200);

  return response.body.data.id as UserId;
};

export const loginUserTest = async (
  app: Express,
  user: {
    username: Username;
    password: Password;
  }
): Promise<string> => {
  const response = await request(app)
    .post("/auth/login")
    .send({
      username: user.username,
      password: user.password,
    })
    .set("Accept", "application/json")
    .expect("Content-Type", /json/)
    .expect(200);

  return response.body.data.token;
};
