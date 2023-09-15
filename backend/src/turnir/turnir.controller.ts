import { Controller, Get } from '@nestjs/common';
import { TurnirService } from './turnir.service';

@Controller('turnir')
export class TurnirController {
  constructor(private turnirService: TurnirService) {}
  @Get('sviTurniri')
  vratiSveTurnire() {
    return this.turnirService.vratiSveTurnire();
  }
}
