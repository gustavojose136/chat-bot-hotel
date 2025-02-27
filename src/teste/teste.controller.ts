import { Body, Controller, Get, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { UltMovResponseDto } from "src/oper/movimentos/movimentos.dto";
import { Request, Response } from 'express';


@ApiTags('Outras Operações')
@Controller('teste')
export class TesteController {
  constructor(
  ) { }

  @Get()
  @ApiResponse({ status: 203, description: 'Sem permissão para essa placa' })
  @ApiResponse({ status: 204, description: 'Não encontrado movimentação dessa placa nas últimas 6 horas' })
  async teste(@Res() resposta: Response) {

    return resposta.status(200).json({ message: 'Teste ok' });

  }
}
