import { Module } from '@nestjs/common';
import { TesteController } from "./teste.controller";

@Module({
  providers: [],
  imports: [],
  controllers: [TesteController]
})
export class TesteModule {}
