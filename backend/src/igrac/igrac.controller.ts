import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { IgracService } from './igrac.service';

@Controller('igrac')
export class IgracController {
  constructor(private igracService: IgracService) {}
  @Get('sviIgraci')
  vratiSveIgrace() {
    return this.igracService.vratiSveIgrace();
  }
  @Get('prijavljeniIgrac')
  vratiPrijavljenogIgraca() {
    return this.igracService.vratiPrijavljenogIgraca();
  }
  @Get('korisnickoIme/:korisnickoIme')
  vratiIgracePoKorisnickomImenu(@Param('korisnickoIme') korisnickoIme: string) {
    return this.igracService.vratiIgracePoKorisnickomImenu(korisnickoIme);
  }

  @Post('post')
  async post(@Body() igrac: any) {
    return await this.igracService.post(igrac);
  }
}
