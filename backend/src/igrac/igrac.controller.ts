import { Controller, Get } from '@nestjs/common';
import { IgracService } from './igrac.service';

@Controller('igrac')
export class IgracController {
  constructor(private igracService: IgracService) {}
  @Get('sviIgraci')
  vratiSveIgrace() {
    return this.igracService.vratiSveIgrace();
  }
}
