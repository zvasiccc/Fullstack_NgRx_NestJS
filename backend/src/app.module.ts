import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { IgracController } from './igrac/igrac.controller';
import { IgracEntity } from './igrac/igrac.entity';
import { IgracModule } from './igrac/igrac.module';
import { IgracService } from './igrac/igrac.service';
import { OrganizatorController } from './organizator/organizator.controller';
import { OrganizatorEntity } from './organizator/organizator.entity';
import { OrganizatorModule } from './organizator/organizator.module';
import { OrganizatorService } from './organizator/organizator.service';
import { PrijavaController } from './prijava/prijava.controller';
import { PrijavaEntity } from './prijava/prijava.entity';
import { PrijavaService } from './prijava/prijava.service';
import { TurnirController } from './turnir/turnir.controller';
import { TurnirEntity } from './turnir/turnir.entity';
import { TurnirService } from './turnir/turnir.service';

import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './auth/jwt.strategy';
import { TurnirModule } from './turnir/turnir.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: 'localhost',
        port: 2345,
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
