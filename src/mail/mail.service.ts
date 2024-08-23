import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'pulidojj174@gmail.com',
        pass: 'rble iwfs ziqp rqpf',
      },
    });
  }

  async sendMail(to: string, subject: string, text: string) {
    const mailOptions = {
      from: 'pulidojj174@gmail.com',
      to,
      subject,
      text,
    };

    return await this.transporter.sendMail(mailOptions);
  }
}
