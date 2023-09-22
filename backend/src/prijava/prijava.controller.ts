import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PrijavaService } from './prijava.service';
import { PrijavaEntity } from './prijava.entity';

@Controller('prijava')
export class PrijavaController {
  constructor(private prijavaService: PrijavaService) {}
  @Get(':id')
  vratiPrijavuPoId(@Param('id') id: number) {
    return this.prijavaService.vratiPrijavuPoId(id);
  }
  @Post('dodajPrijavu')
  async dodajPrijavu(@Body() prijava: PrijavaEntity) {
    return await this.prijavaService.dodajPrijavu(prijava);
  }
}
