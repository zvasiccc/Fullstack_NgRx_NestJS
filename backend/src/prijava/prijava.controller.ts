import { Controller, Get, Param } from '@nestjs/common';
import { PrijavaService } from './prijava.service';

@Controller('prijava')
export class PrijavaController {
  constructor(private prijavaService: PrijavaService) {}
  @Get(':id')
  vratiPrijavuPoId(@Param('id') id: number) {
    return this.prijavaService.vratiPrijavuPoId(id);
  }
}
