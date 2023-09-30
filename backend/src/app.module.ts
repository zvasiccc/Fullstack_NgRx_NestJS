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
import { OrganizatorController } from './organizator/organizator.controller';
import { OrganizatorService } from './organizator/organizator.service';
import { OrganizatorEntity } from './organizator/organizator.entity';
import { AuthModule } from './auth/auth.module';
import { IgracModule } from './igrac/igrac.module';
import { OrganizatorModule } from './organizator/organizator.module';
import { APP_GUARD } from '@nestjs/core';

import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './auth/jwt.strategy';
import { TurnirModule } from './turnir/turnir.module';

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
        entities: [IgracEntity, PrijavaEntity, TurnirEntity, OrganizatorEntity],
        synchronize: true,
      }),
    }),
    TypeOrmModule.forFeature([
      IgracEntity,
      PrijavaEntity,
      TurnirEntity,
      OrganizatorEntity,
    ]),
    AuthModule,
    IgracModule,
    OrganizatorModule,
    TurnirModule,
    JwtModule,
  ],
  controllers: [
    AppController,
    IgracController,
    TurnirController,
    PrijavaController,
    OrganizatorController,
  ],
  providers: [
    AppService,
    IgracService,
    TurnirService,
    PrijavaService,
    OrganizatorService,
    JwtStrategy,
  ],
})
export class AppModule {}
