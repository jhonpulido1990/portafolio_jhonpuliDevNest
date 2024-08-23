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
        user: 'jjpulio8@misena.edu.co',
        pass: 'Jhonpulido1990;',
      },
    });
  }

  async sendMail(to: string, subject: string, text: string) {
    const mailOptions = {
      from: 'jjpulio8@misena.edu.co',
      to,
      subject,
      text,
    };

    return await this.transporter.sendMail(mailOptions);
  }
}
