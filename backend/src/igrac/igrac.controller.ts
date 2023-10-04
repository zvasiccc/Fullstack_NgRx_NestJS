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
  @Get('vratiSveIgraceOsimTrenutnog/:igracId')
  async vratiSveIgraceOsimTrenutnog(@Param('igracId') igracId: number) {
    return await this.igracService.vratiSveIgraceOsimTrenutnog(igracId);
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
    // Ne treba ovk console.log("User je" + req.user) ng console.log("User je", req.user)
    // Razumes li kvo? koja je razlika
    // Pa s + on pretvaraaha aha u string pretvara Da, i zbog tija si imal [object object],razumem, sad jos sifre da hesiram
    //treba li nekakav salt mrtvi da pravim, vido na net nesto, ma jok, najprostije samo,kude da vidim to Ima na mn ima i u zvanictnu dokmentaciju od
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
  @UseGuards(JwtAuthGuard, IgracGuard)
  @Get('vratiIgraceIzIstogTima/:turnirId/:igracId')
  vratiIgraceIzIstogTima(
    @Param('turnirId') turnirId: number,
    @Param('igracId') igracId: number,
  ) {
    return this.igracService.vratiIgraceIzIstogTima(turnirId, igracId);
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
