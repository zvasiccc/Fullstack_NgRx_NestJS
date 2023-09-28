import { Module } from '@nestjs/common';
import { IgracService } from './igrac.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IgracEntity } from './igrac.entity';
import { PrijavaEntity } from 'src/prijava/prijava.entity';
import { TurnirEntity } from 'src/turnir/turnir.entity';
import { OrganizatorEntity } from 'src/organizator/organizator.entity';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from 'src/auth/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      IgracEntity,
      OrganizatorEntity,
      PrijavaEntity,
      TurnirEntity,
    ]),
  ],
  providers: [IgracService, JwtStrategy, JwtService],
  exports: [IgracService],
})
export class IgracModule {}
