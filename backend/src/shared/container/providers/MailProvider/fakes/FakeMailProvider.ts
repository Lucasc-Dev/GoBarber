import IMailProvider from "../models/IMailProvider";
import { text } from "express";

interface Message {
    to: string;
    body: string;
}

export default class FakeEmailProvider implements IMailProvider{
    private messages: Message[] = [];

    public async sendMail(to: string, body: string): Promise<void> {
        this.messages.push({ 
            to,
            body,
        });
    }
}