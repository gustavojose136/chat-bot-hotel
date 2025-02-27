import { Controller, Get } from '@nestjs/common';
import { WhatsAppService } from './whatsapp.service';

@Controller('whatsapp')
export class WhatsAppController {
  constructor(private readonly whatsAppService: WhatsAppService) {}

  @Get('status')
  getStatus() {
    return { message: 'Verifique o terminal para o QR Code ou status da conexão.' };
  }
}
