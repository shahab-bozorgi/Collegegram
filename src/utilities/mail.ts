import * as nodemailer from "nodemailer";
import { Email } from "../data/email";
import SMTPTransport from "nodemailer/lib/smtp-transport";

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  secure: false,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASS,
  },
});

export const sendMail = async (
  receipients: Email[],
  subject: string,
  text: string,
  html?: string
): Promise<SMTPTransport.SentMessageInfo> =>
  transporter.sendMail({
    to: receipients.join(", "),
    subject,
    text,
    html,
  });
