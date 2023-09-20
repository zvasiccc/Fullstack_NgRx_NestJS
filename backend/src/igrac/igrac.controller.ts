import { Controller, Get, Param } from '@nestjs/common';
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
}
