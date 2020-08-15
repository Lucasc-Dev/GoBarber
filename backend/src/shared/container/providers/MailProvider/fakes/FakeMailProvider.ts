import IMailProvider from "../models/IMailProvider";
import { text } from "express";
import ISendMailDTO from "../dtos/ISendMailDTO";

export default class FakeEmailProvider implements IMailProvider{
    private messages: ISendMailDTO[] = [];

    public async sendMail(message: ISendMailDTO): Promise<void> {
        this.messages.push(message);
    }
}