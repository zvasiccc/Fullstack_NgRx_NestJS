import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TurnirService } from './turnir.service';
import { TurnirEntity } from './turnir.entity';

@Controller('turnir')
export class TurnirController {
  constructor(private turnirService: TurnirService) {}
  @Get('sviTurniri')
  async vratiSveTurnire() {
    return await this.turnirService.vratiSveTurnire();
  }
  @Get('odgovarajuciTurniri/:naziv/:mesto/:datum')
  async odgovarajuciTurnir(
    @Param('naziv') naziv: string,
    @Param('mesto') mesto: string,
    @Param('datum') datum: string,
  ) {
    return await this.turnirService.odgovarajuciTurniri(naziv, mesto, datum);
  }
  @Post('dodajTurnir')
  async dodajTurnir(@Body() turnir: TurnirEntity) {
    return await this.turnirService.dodajTurnir(turnir);
  }
}
