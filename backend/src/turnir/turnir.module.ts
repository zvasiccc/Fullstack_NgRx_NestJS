import { PrijavaEntity } from 'src/prijava/prijava.entity';
import { TurnirEntity } from 'src/turnir/turnir.entity';

import { IgracEntity } from 'src/igrac/igrac.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { OrganizatorEntity } from 'src/organizator/organizator.entity';
import { OrganizatorService } from 'src/organizator/organizator.service';
import { TurnirService } from './turnir.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      IgracEntity,
      OrganizatorEntity,
      PrijavaEntity,
      TurnirEntity,
    ]),
  ],
  providers: [TurnirService, JwtService],
  exports: [TurnirService],
})
export class TurnirModule {}
