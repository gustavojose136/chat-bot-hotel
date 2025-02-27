import { Injectable, Logger } from '@nestjs/common';
import makeWASocket, { useMultiFileAuthState, DisconnectReason } from 'baileys';
import * as fs from 'fs';
import * as qrcode from 'qrcode-terminal';  

@Injectable()
export class WhatsAppService {
  private sock;
  private readonly logger = new Logger(WhatsAppService.name);

  constructor() {
    this.initializeWhatsApp();
  }

  async initializeWhatsApp() {
    const { state, saveCreds } = await useMultiFileAuthState('auth_info');
    this.sock = makeWASocket({ auth: state });

    this.sock.ev.on('creds.update', saveCreds);

    this.sock.ev.on('connection.update', ({ connection, lastDisconnect, qr }) => {
      if (qr) {
        this.logger.log('Escaneie o QR Code abaixo para autenticar:');
        qrcode.generate(qr, { small: true });  //Importante pro qr code aparecer no terminal kkkkk
      }

      if (connection === 'close') {
        const shouldReconnect = (lastDisconnect.error as any)?.output?.statusCode !== DisconnectReason.loggedOut;
        if (shouldReconnect) {
          this.logger.log('Tentando reconectar...');
          this.initializeWhatsApp();
        } else {
          this.logger.warn('Sessão encerrada. Escaneie o QR Code novamente.');
        }
      } else if (connection === 'open') {
        this.logger.log('Conectado ao WhatsApp com sucesso!');
      }
    });
  }

  async sendImage(jid: string, imagePath: string, caption = 'Aqui está sua imagem!') {
    const imageBuffer = fs.readFileSync(imagePath);
    await this.sock.sendMessage(jid, { image: imageBuffer, caption });
    this.logger.log(`Imagem enviada para ${jid}`);
  }

  async sendText(jid: string, text: string) {
    await this.sock.sendMessage(jid, { text });
    this.logger.log(`Mensagem de texto enviada para ${jid}`);
  }
}
