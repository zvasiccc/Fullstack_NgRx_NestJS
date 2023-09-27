import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';

import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { IgracModule } from 'src/igrac/igrac.module';
import { JwtStrategy } from './jwt.strategy';
@Module({
  imports: [
    IgracModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})

// @Module({
//   imports: [
//     PassportModule,
//     JwtModule.register({
//       secret: jwtConstants.secret,
//       signOptions: { expiresIn: '60s' },
//     }),

//   ],
//   providers: [AuthService, LocalStrategy],
//   exports: [AuthService],
// })
export class AuthModule {}
