import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { TurnirService } from './turnir.service';
import { TurnirEntity } from './turnir.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { OrganizatorGuard } from 'src/auth/organizator.role.guard';
import { IgracGuard } from 'src/auth/igrac.role.guard';

@Controller('turnir')
export class TurnirController {
  constructor(private turnirService: TurnirService) {}

  @Get('sviTurniri')
  async vratiSveTurnire() {
    return await this.turnirService.vratiSveTurnire();
  }
  // @Get('odgovarajuciTurniri/:naziv/:mesto/:datum')
  // async odgovarajuciTurnir(
  //   @Param('naziv') naziv: string,
  //   @Param('mesto') mesto: string,
  //   @Param('datum') datum: string,
  // ) {
  //   return await this.turnirService.odgovarajuciTurniri(naziv, mesto, datum);
  // }
  @UseGuards(JwtAuthGuard, OrganizatorGuard)
  @Post('dodajTurnir')
  async dodajTurnir(@Body() turnir: TurnirEntity) {
    return await this.turnirService.dodajTurnir(turnir);
  }
  ///:pretragaNaziv/:pretragaMesto/:pretragaPocetniDatum/:pretragaKrajnjiDatum
  @Get('filtrirajTurnire')
  async filtrirajTurnire(
    // @Param('pretragaNaziv') pretragaNaziv: string,
    // @Param('pretragaMesto') pretragaMesto: string,
    // @Param('pretragaPocetniDatum') pretragaPocetniDatum: string,
    // @Param('pretragaKrajnjiDatum') pretragaKrajnjiDatum: string,
    // @Param('pretragaPocetnaNagrada') pretragaPocetnaNagrada: number,
    // @Param('pretragaKrajnjaNagrada') pretragaKrajnjaNagrada: number,
    @Query('pretragaNaziv') pretragaNaziv: string,
    @Query('pretragaMesto') pretragaMesto: string,
    @Query('pretragaPocetniDatum') pretragaPocetniDatum: string,
    @Query('pretragaKrajnjiDatum') pretragaKrajnjiDatum: string,
    @Query('pretragaPocetnaNagrada') pretragaPocetnaNagrada: number,
    @Query('pretragaKrajnjaNagrada') pretragaKrajnjaNagrada: number,
  ) {
    return this.turnirService.filtrirajTurnire(
      pretragaNaziv,
      pretragaMesto,
      pretragaPocetniDatum,
      pretragaKrajnjiDatum,
      pretragaPocetnaNagrada,
      pretragaKrajnjaNagrada,
    );
  }
  @UseGuards(JwtAuthGuard, OrganizatorGuard)
  @Delete('obrisiTurnir/:id')
  async obrisiTurnir(@Param('id') id: number) {
    return this.turnirService.obrisiTurnir(id);
  }
}
