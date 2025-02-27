import { Controller, Post, Body } from '@nestjs/common';
import { MensagemService } from './mensagem.service';

@Controller('mensagem')
export class MensagemController {
  constructor(private readonly mensagemService: MensagemService) {}

  // Enviar imagem gerada a partir de HTML enviado na requisição
  @Post('enviar-via-html')
  async sendImageFromHtml(@Body() body: { jid: string; html: string }) {
    await this.mensagemService.generateAndSendImageFromHtml(body.jid, body.html);
    return { message: 'Imagem gerada a partir de HTML e enviada com sucesso!' };
  }

  // Enviar imagem gerada a partir de um arquivo local
  @Post('eviar-via-arquivo')
  async sendImageFromFile(@Body() body: { jid: string; filePath: string }) {
    await this.mensagemService.generateAndSendImageFromFile(body.jid, body.filePath);
    return { message: 'Imagem gerada a partir de arquivo local e enviada com sucesso!' };
  }

  // Enviar imagem gerada a partir de uma URL externa
  @Post('enviar-via-url')
  async sendImageFromUrl(@Body() body: { jid: string; url: string }) {
    await this.mensagemService.generateAndSendImageFromUrl(body.jid, body.url);
    return { message: 'Informe operacaional att' };
  }

  // Enviar mensagem personalizada
  @Post('enviar-mensagem-personalizada')
  async sendCustomMessage(@Body() body: { jid: string; message: string }) {
    await this.mensagemService.sendCustomMessage(body.jid, body.message);
    return { message: 'Mensagem enviada com sucesso!' };
  }
}
