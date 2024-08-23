import { Body, Controller, Post } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Post('send')
  async sendMail(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('message') message: string,
  ) {
    const subject = `message de ${name}`;
    const text = `Nombre: ${name}\nCorreo: ${email}\n\nMensaje: \n${message}`;

    return await this.mailService.sendMail(
      'pulidojj174@gmail.com',
      subject,
      text,
    );
  }
}
