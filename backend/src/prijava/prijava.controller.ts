import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { PrijavaService } from './prijava.service';
import { PrijavaEntity } from './prijava.entity';
import { IgracService } from 'src/igrac/igrac.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { OrganizatorGuard } from 'src/auth/organizator.role.guard';
import { IgracGuard } from 'src/auth/igrac.role.guard';

@Controller('prijava')
export class PrijavaController {
  constructor(
    private prijavaService: PrijavaService,
    private igracService: IgracService,
  ) {}
  @UseGuards(JwtAuthGuard, OrganizatorGuard)
  @Get(':id')
  vratiPrijavuPoId(@Param('id') id: number) {
    return this.prijavaService.vratiPrijavuPoId(id);
  }
  //todo kada treba da stiti od nelogovanog korisnika ali bilo koji logovan da moze ne radi
  @UseGuards(JwtAuthGuard, IgracGuard)
  @Post('dodajPrijavu')
  async dodajPrijavu(@Body() prijava: any) {
    try {
      return await this.prijavaService.dodajPrijavu(prijava);
    } catch (error) {
      return { porukaGreske: 'Došlo je do greške prilikom obrade prijave.' };
    }
  }
  @UseGuards(JwtAuthGuard)
  @Get('prijaveNaTurniru/:turnirId')
  async prijaveNaTurniru(@Param('turnirId') turnirId: number) {
    return await this.prijavaService.prijaveNaTurniru(turnirId);
  }
  @UseGuards(JwtAuthGuard, OrganizatorGuard)
  @Delete('izbaciTimSaTurnira/:prijavaId')
  async izbaciTimSaTurnira(@Param('prijavaId') prijavaId: number) {
    return await this.prijavaService.izbaciTimSaTurnira(prijavaId);
  }
  @Delete('odjaviSvojTimSaTurnira/:turnirId/:igracId')
  async odjaviSvojTimSaTurnira(
    @Param('turnirId') turnirId: number,
    @Param('igracId') igracId: number,
  ) {
    return await this.prijavaService.odjaviSvojTimSaTurnira(turnirId, igracId);
  }
}
