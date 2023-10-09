import { PrijavaEntity } from 'src/prijava/prijava.entity';
import { TurnirEntity } from 'src/turnir/turnir.entity';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IgracEntity } from 'src/igrac/igrac.entity';

import { JwtService } from '@nestjs/jwt';
import { OrganizatorEntity } from 'src/organizator/organizator.entity';
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
