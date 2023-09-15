import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { IgracController } from './igrac/igrac.controller';
import { IgracService } from './igrac/igrac.service';
import { TurnirController } from './turnir/turnir.controller';
import { TurnirService } from './turnir/turnir.service';
import { PrijavaService } from './prijava/prijava.service';
import { PrijavaController } from './prijava/prijava.controller';

@Module({
  imports: [],
  controllers: [
    AppController,
    IgracController,
    TurnirController,
    PrijavaController,
  ],
  providers: [AppService, IgracService, TurnirService, PrijavaService],
})
export class AppModule {}
