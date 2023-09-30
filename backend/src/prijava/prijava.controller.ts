import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
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
  @UseGuards(JwtAuthGuard, OrganizatorGuard, IgracGuard)
  @Post('dodajPrijavu')
  async dodajPrijavu(@Body() prijava: any) {
    console.log(prijava);
    return await this.prijavaService.dodajPrijavu(prijava);
  }
  @UseGuards(JwtAuthGuard, OrganizatorGuard, IgracGuard)
  @Get('prijaveNaTurniru/:turnirId')
  async prijaveNaTurniru(@Param('turnirId') turnirId: number) {
    return await this.prijavaService.prijaveNaTurniru(turnirId);
  }
  @UseGuards(JwtAuthGuard, OrganizatorGuard)
  @Delete('izbaciTimSaTurnira/:prijavaId')
  async izbaciTimSaTurnira(@Param('prijavaId') prijavaId: number) {
    return await this.prijavaService.izbaciTimSaTurnira(prijavaId);
  }
}
