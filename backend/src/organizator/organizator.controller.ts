import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Headers,
} from '@nestjs/common';
import { OrganizatorService } from './organizator.service';
import { OrganizatorEntity } from './organizator.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from 'src/roles/role.enum';
import { OrganizatorGuard } from 'src/auth/organizator.role.guard';

@Controller('organizator')
export class OrganizatorController {
  constructor(private organizatorService: OrganizatorService) {}
  @UseGuards(JwtAuthGuard, OrganizatorGuard)
  @Get('sviOrganizatori')
  vratiSveOrganizatore() {
    return this.organizatorService.vratiSveOrganizatore();
  }
  @UseGuards(JwtAuthGuard, OrganizatorGuard)
  @Get('vratiOrganizatoraIzTokena')
  vratiOrganizatoraIzTokena(@Headers('authorization') authorization: string) {
    if (authorization)
      return this.organizatorService.vratiOrganizatoraIzTokena(authorization);
    else return null;
  }
  @Get('findOne/:username')
  findOne(@Param('username') username: string) {
    return this.organizatorService.findOne(username);
  }

  @Post('registrujOrganizatora')
  async registrujOrganizatora(@Body() organizator: OrganizatorEntity) {
    await this.organizatorService.registrujOrganizatora(organizator);
  }
}
