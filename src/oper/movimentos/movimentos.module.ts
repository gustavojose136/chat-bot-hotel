import { Module } from '@nestjs/common';
import { MovimentosService } from './movimentos.service';
import { MovimentosController } from './movimentos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UltMovEntity } from '../../db/entities/oper/movimento.entity';
import { AuthEmpresasModule } from '../../auth/auth-empresas/auth-empresas.module';
import { AuthModule } from '../../auth/auth.module';


@Module({
  providers: [MovimentosService],
  imports: [TypeOrmModule.forFeature([UltMovEntity]), AuthEmpresasModule, AuthModule],
  controllers: [MovimentosController]
})
export class MovimentosModule {}
