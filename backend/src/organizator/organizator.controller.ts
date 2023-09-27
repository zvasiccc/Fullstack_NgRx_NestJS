import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { OrganizatorService } from './organizator.service';
import { OrganizatorEntity } from './organizator.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enum';

@Controller('organizator')
export class OrganizatorController {
  constructor(private organizatorService: OrganizatorService) {}
  @UseGuards(JwtAuthGuard)
  @Roles(Role.Organizator)
  @Get('sviOrganizatori')
  vratiSveOrganizatore() {
    return this.organizatorService.vratiSveOrganizatore();
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
