import { Module } from '@nestjs/common';
import { IgracService } from './igrac.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IgracEntity } from './igrac.entity';
import { PrijavaEntity } from 'src/prijava/prijava.entity';
import { TurnirEntity } from 'src/turnir/turnir.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([IgracEntity, PrijavaEntity, TurnirEntity]),
  ],
  providers: [IgracService],
  exports: [IgracService],
})
export class IgracModule {}
