import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { PrijavaService } from './prijava.service';
import { PrijavaEntity } from './prijava.entity';
import { IgracService } from 'src/igrac/igrac.service';

@Controller('prijava')
export class PrijavaController {
  constructor(
    private prijavaService: PrijavaService,
    private igracService: IgracService,
  ) {}
  @Get(':id')
  vratiPrijavuPoId(@Param('id') id: number) {
    return this.prijavaService.vratiPrijavuPoId(id);
  }
  @Post('dodajPrijavu')
  async dodajPrijavu(@Body() prijava: any) {
    console.log(prijava);
    return await this.prijavaService.dodajPrijavu(prijava);
  }

  @Get('prijaveNaTurniru/:turnirId')
  async prijaveNaTurniru(@Param('turnirId') turnirId: number) {
    return await this.prijavaService.prijaveNaTurniru(turnirId);
  }
  @Delete('izbaciTimSaTurnira/:prijavaId')
  async izbaciTimSaTurnira(@Param('prijavaId') prijavaId: number) {
    return await this.prijavaService.izbaciTimSaTurnira(prijavaId);
  }
}
