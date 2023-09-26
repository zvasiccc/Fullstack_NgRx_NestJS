import { Body, Controller, Param, Post } from '@nestjs/common';
import { OrganizatorService } from './organizator.service';
import { OrganizatorEntity } from './organizator.entity';

@Controller('organizator')
export class OrganizatorController {
  constructor(private organizatorService: OrganizatorService) {}
  @Post('registrujOrganizatora')
  async registrujOrganizatora(@Body() organizator: OrganizatorEntity) {
    await this.organizatorService.registrujOrganizatora(organizator);
  }
}
