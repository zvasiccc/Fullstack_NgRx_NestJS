import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
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
  @Get(
    'filtrirajTurnire/:pretragaNaziv/:pretragaMesto/:pretragaPocetniDatum/:pretragaKrajnjiDatum',
  )
  async filtrirajTurnire(
    @Param('pretragaNaziv') pretragaNaziv: string,
    @Param('pretragaMesto') pretragaMesto: string,
    @Param('pretragaPocetniDatum') pretragaPocetniDatum: string,
    @Param('pretragaKrajnjiDatum') pretragaKrajnjiDatum: string,
    // @Query('pretragaNaziv') pretragaNaziv: string,
    // @Query('pretragaMesto') pretragaMesto: string,
    // @Query('pretragaPocetniDatum') pretragaPocetniDatum: string,
    // @Query('pretragaKrajnjiDatum') pretragaKrajnjiDatum: string,
  ) {
    return this.turnirService.filtrirajTurnire(
      pretragaNaziv,
      pretragaMesto,
      pretragaPocetniDatum,
      pretragaKrajnjiDatum,
    );
  }
}
