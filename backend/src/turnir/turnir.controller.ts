import { Controller, Get, Param } from '@nestjs/common';
import { TurnirService } from './turnir.service';

@Controller('turnir')
export class TurnirController {
  constructor(private turnirService: TurnirService) {}
  @Get('sviTurniri')
  vratiSveTurnire() {
    return this.turnirService.vratiSveTurnire();
  }
  @Get('odgovarajuciTurniri/:naziv/:mesto/:datum')
  odgovarajuciTurnir(
    @Param('naziv') naziv: string,
    @Param('mesto') mesto: string,
    @Param('datum') datum: string,
  ) {
    return this.turnirService.odgovarajuciTurniri(naziv, mesto, datum);
  }
}
