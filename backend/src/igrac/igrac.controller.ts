import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { IgracGuard } from 'src/auth/igrac.role.guard';
import { IgracEntity } from './igrac.entity';
import { IgracService } from './igrac.service';

@Controller('igrac')
export class IgracController {
  constructor(private igracService: IgracService) {}

  @UseGuards(JwtAuthGuard, IgracGuard)
  @Get('vratiMoguceSaigrace')
  async vratiMoguceSaigrace(@Request() req: any) {
    return await this.igracService.vratiMoguceSaigrace(req.user.userId);
  }

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

  @Get('findOne/:username')
  findOne(@Param('username') username: string) {
    return this.igracService.findOne(username);
  }
  @UseGuards(JwtAuthGuard, IgracGuard)
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
