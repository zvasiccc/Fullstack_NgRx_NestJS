import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Headers,
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
  @UseGuards(JwtAuthGuard)
  @Get('mojiTurniri')
  async vratiMojeTurnire(@Headers('authorization') authorization: string) {
    console.log(authorization);
    return await this.turnirService.vratiMojeTurnire(authorization);
  }
  @UseGuards(JwtAuthGuard, OrganizatorGuard)
  @Post('dodajTurnir')
  async dodajTurnir(
    @Body() turnir: TurnirEntity,
    @Headers('authorization') authorization: string,
  ) {
    return await this.turnirService.dodajTurnir(turnir, authorization);
  }
  @Get(
    'filtrirajTurnire/:pretragaNaziv?/:pretragaMesto?/:pretragaPocetniDatum?/:pretragaKrajnjiDatum?/:pretragaPocetnaNagrada?/:pretragaKrajnjaNagrada?',
  )
  async filtrirajTurnire(
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
