import { Controller, Get, Param, Post, Body, UseGuards } from '@nestjs/common';
import { IgracService } from './igrac.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enum';

@Controller('igrac')
export class IgracController {
  constructor(private igracService: IgracService) {}

  @Get('sviIgraci')
  async vratiSveIgrace() {
    return await this.igracService.vratiSveIgrace();
  }
  @Get('prijavljeniIgrac') //TODO hardkodirano je trenutno
  vratiPrijavljenogIgraca() {
    return this.igracService.vratiPrijavljenogIgraca();
  }
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Igrac)
  @Get('korisnickoIme/:korisnickoIme')
  async vratiIgracePoKorisnickomImenu(
    @Param('korisnickoIme') korisnickoIme: string,
  ) {
    return await this.igracService.vratiIgracePoKorisnickomImenu(korisnickoIme);
  }

  @Post('registrujIgraca')
  async post(@Body() igrac: any) {
    return await this.igracService.registrujIgraca(igrac);
  }

  @Get('pronadjiIgraceZaPrijavu/:id')
  async pronadjiIgraceZaPrijavu(@Param('id') id: number) {
    return await this.igracService.pronadjiIgraceZaPrijavu(id);
  }
  @Get('findOne/:username')
  findOne(@Param('username') username: string) {
    return this.igracService.findOne(username);
  }
}
