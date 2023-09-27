import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IgracService } from 'src/igrac/igrac.service';

@Injectable()
export class AuthService {
  constructor(
    private igracService: IgracService,
    private jwtService: JwtService,
  ) {}
  async validateUser(username: string, pass: string): Promise<any> {
    const igrac = await this.igracService.findOne(username);

    if (igrac && igrac.lozinka === pass) {
      const { lozinka, ...result } = igrac;
      return result;
    }
    return null;
  }
  async login(igrac: any) {
    const payload = { username: igrac.username, sub: igrac.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
