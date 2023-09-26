import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { IgracService } from './igrac.service';

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
  @Get('korisnickoIme/:korisnickoIme')
  async vratiIgracePoKorisnickomImenu(
    @Param('korisnickoIme') korisnickoIme: string,
  ) {
    return await this.igracService.vratiIgracePoKorisnickomImenu(korisnickoIme);
  }

  @Post('dodajIgraca')
  async post(@Body() igrac: any) {
    return await this.igracService.dodajIgraca(igrac);
  }
  @Get('pronadjiIgraceZaPrijavu/:id')
  async pronadjiIgraceZaPrijavu(@Param('id') id: number) {
    return await this.igracService.pronadjiIgraceZaPrijavu(id);
  }
}
