import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DbModule } from './db/db.module';
import { ConfigModule } from '@nestjs/config';
import { MovimentosModule } from './oper/movimentos/movimentos.module';
import { AuthEmpresasModule } from './auth/auth-empresas/auth-empresas.module';
import { TesteModule } from './teste/teste.module';
import { WhatsAppModule } from './whatsapp/whatsapp.module';
import { MensagemModule } from './mensagem/mensagem.module';

@Module({
  imports: [
    AuthModule, 
    DbModule, 
    ConfigModule.forRoot({ 
      isGlobal: true 
    }), 
    MovimentosModule, 
    AuthEmpresasModule, 
    WhatsAppModule,
    TesteModule,
    MensagemModule,],
  controllers: [],
  providers: [],
})
export class AppModule { }
