import { PrijavaEntity } from 'src/prijava/prijava.entity';
import { TurnirEntity } from 'src/turnir/turnir.entity';
import { OrganizatorEntity } from './organizator.entity';
import { IgracEntity } from 'src/igrac/igrac.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { OrganizatorService } from './organizator.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      IgracEntity,
      OrganizatorEntity,
      PrijavaEntity,
      TurnirEntity,
    ]),
  ],
  providers: [OrganizatorService, JwtService],
  exports: [OrganizatorService],
})
export class OrganizatorModule {}
