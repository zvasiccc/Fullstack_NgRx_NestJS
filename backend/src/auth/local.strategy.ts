import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    let user = await this.authService.validateIgrac(username, password);
    if (!user) {
      user = await this.authService.validateOrganizator(username, password);
      if (!user) throw new UnauthorizedException();
    }
    return user;
  }
}
