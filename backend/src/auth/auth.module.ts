import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';

import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { IgracModule } from 'src/igrac/igrac.module';
import { JwtStrategy } from './jwt.strategy';
import { OrganizatorModule } from 'src/organizator/organizator.module';
@Module({
  imports: [
    IgracModule,
    OrganizatorModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
