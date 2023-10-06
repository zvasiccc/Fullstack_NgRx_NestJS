import {
  Body,
  Controller,
  Get,
  Headers,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from 'src/roles/role.enum';

import { IgracService } from './igrac.service';
import { IgracGuard } from 'src/auth/igrac.role.guard';
import { IgracEntity } from './igrac.entity';
import { VodjaGuard } from 'src/auth/vodja.role.guard';
import { register } from 'module';

@Controller('igrac')
export class IgracController {
  constructor(private igracService: IgracService) {}
  // @UseGuards(JwtAuthGuard)
  // @Roles(Role.Igrac)
  @Get('sviIgraci')
  async vratiSveIgrace() {
    return await this.igracService.vratiSveIgrace();
  }
  @UseGuards(JwtAuthGuard, IgracGuard)
  @Get('vratiMoguceSaigrace')
  async vratiMoguceSaigrace(@Request() req: any) {
    return await this.igracService.vratiMoguceSaigrace(req.user.userId);
  }
  // @UseGuards(JwtAuthGuard, IgracGuard, VodjaGuard)
  // @Get('slobodniIgraciZaTurnir/:turnirId')
  // async slobodniIgraciZaTurnir(@Param('turnirId') turnirId: number) {
  //   return await this.igracService.slobodniIgraciZaTurnir(turnirId);
  // }

  @UseGuards(JwtAuthGuard, IgracGuard)
  @Get('korisnickoIme/:korisnickoIme')
  async igraciSaSlicnimKorisnickimImenom(
    @Param('korisnickoIme') korisnickoIme: string,
  ) {
    return await this.igracService.igraciSaSlicnimKorisnickimImenom(
      korisnickoIme,
    );
  }

  @Post('registrujIgraca')
  async post(@Body() igrac: IgracEntity) {
    return await this.igracService.registrujIgraca(igrac);
  }

  @UseGuards(JwtAuthGuard)
  @Get('dohvatiIgraca/:korisnickoIme')
  async dohvatiIgraca(@Param('korisnickoIme') korisnickoIme: string) {
    return this.igracService.dohvatiIgraca(korisnickoIme);
  }
  @UseGuards(JwtAuthGuard, IgracGuard)
  @Put('izmeniPodatkeOIgracu')
  async izmeniPodatkeOIgracu(@Request() req: any, @Body() igrac: IgracEntity) {
    return this.igracService.izmeniPodatkeOIgracu(req.user.userId, igrac);
  }

  // @UseGuards(JwtAuthGuard)
  // @Get('vratiIgracaIzTokena')
  // vratiIgracaIzTokena(@Headers('authorization') authorization: string) {
  //   if (authorization) {
  //     //const token = authorization.replace('Bearer ', ''); // Uklonimo "Bearer " prefiks
  //     return this.igracService.vratiIgracaIzTokena(authorization); // Prosleđujemo token servisu
  //   } else {
  //     // Nema tokena u zaglavlju, obradite to kako želite
  //     return null;
  //   }
  // }

  // @Get('pronadjiIgraceZaPrijavu/:id') //?
  // async pronadjiIgraceZaPrijavu(@Param('id') id: number) {
  //   return await this.igracService.pronadjiIgraceZaPrijavu(id);
  // }
  @Get('findOne/:username')
  findOne(@Param('username') username: string) {
    return this.igracService.findOne(username);
  }
  //@UseGuards(JwtAuthGuard, IgracGuard)
  @Get('vratiIgraceIzIstogTima/:turnirId/:igracId')
  async vratiSaigrace(
    @Param('turnirId') turnirId: number,
    @Param('igracId') igracId: number,
  ) {
    return await this.igracService.vratiSaigrace(turnirId, igracId);
  }
  @UseGuards(JwtAuthGuard, IgracGuard)
  @Get('daLiJeIgracPrijavljenNaTurnir/:turnirId/:igracId')
  async daLiJeIgracPrijavljenNaTurnir(
    @Param('turnirId') turnirId: number,
    @Param('igracId') igracId: number,
  ) {
    return await this.igracService.daLiJeIgracPrijavljenNaTurnir(
      turnirId,
      igracId,
    );
  }
}
