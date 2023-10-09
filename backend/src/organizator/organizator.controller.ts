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
import { OrganizatorGuard } from 'src/auth/organizator.role.guard';
import { OrganizatorEntity } from './organizator.entity';
import { OrganizatorService } from './organizator.service';

@Controller('organizator')
export class OrganizatorController {
  constructor(private organizatorService: OrganizatorService) {}

  @Get('findOne/:username')
  findOne(@Param('username') username: string) {
    return this.organizatorService.findOne(username);
  }

  @Post('registrujOrganizatora')
  async registrujOrganizatora(@Body() organizator: OrganizatorEntity) {
    await this.organizatorService.registrujOrganizatora(organizator);
  }
  @UseGuards(JwtAuthGuard, OrganizatorGuard)
  @Get('daLiJeOrganizatorTurnira/:organizatorId/:turnirId')
  daLiJeOrganizatorTurnira(
    @Param('organizatorId') organizationId: number,
    @Param('turnirId') turnirId: number,
  ) {
    return this.organizatorService.daLiJeOrganizatorTurnira(
      organizationId,
      turnirId,
    );
  }
  @UseGuards(JwtAuthGuard, OrganizatorGuard)
  @Put('izmeniPodatkeOOrganizatoru')
  async izmeniPodatkeOOrganizatoru(
    @Request() req: any,
    @Body() organizator: OrganizatorEntity,
  ) {
    return this.organizatorService.izmeniPodatkeOOrganizatoru(
      req.user.userId,
      organizator,
    );
  }
}
