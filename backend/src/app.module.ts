import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { IgracController } from './igrac/igrac.controller';
import { IgracService } from './igrac/igrac.service';
import { TurnirController } from './turnir/turnir.controller';
import { TurnirService } from './turnir/turnir.service';
import { PrijavaService } from './prijava/prijava.service';
import { PrijavaController } from './prijava/prijava.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IgracEntity } from './igrac/igrac.entity';
import { PrijavaEntity } from './prijava/prijava.entity';
import { TurnirEntity } from './turnir/turnir.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: 'localhost', // Ovde ide localhost
        port: 2345, // ovde port 2345 akvo je baza u docker, a ti rabotis lokalnoto

        // Ne, sad pokrenes samo docker compose up, a u drugiti terminal kucas npm run start:dev, i promeni ovo kvo sam napisal, ovijata 2 red
        //pa mogu li da stoje promenjeni, mogu dok ne ode u docker

        username: 'user',
        password: 'puflander',
        database: 'RWA_PROJEKAT',
        entities: [IgracEntity, PrijavaEntity, TurnirEntity],
        synchronize: true,
      }),
    }),
    TypeOrmModule.forFeature([IgracEntity, PrijavaEntity, TurnirEntity]),
  ],
  controllers: [
    AppController,
    IgracController,
    TurnirController,
    PrijavaController,
  ],
  providers: [AppService, IgracService, TurnirService, PrijavaService],
})
export class AppModule {}
