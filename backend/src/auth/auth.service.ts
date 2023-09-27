import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IgracService } from 'src/igrac/igrac.service';
import { OrganizatorService } from 'src/organizator/organizator.service';

@Injectable()
export class AuthService {
  constructor(
    private igracService: IgracService,
    private organizatorService: OrganizatorService,
    private jwtService: JwtService,
  ) {}
  async validateIgrac(username: string, pass: string): Promise<any> {
    const igrac = await this.igracService.findOne(username);
    if (igrac && igrac.lozinka === pass) {
      const { lozinka, ...result } = igrac;
      return result; //koristimo sve osim lozinke
    }
    return null;
  }
  async validateOrganizator(username: string, pass: string): Promise<any> {
    const organizator = await this.organizatorService.findOne(username);
    if (organizator && organizator.lozinka === pass) {
      const { lozinka, ...result } = organizator;
      return result; //koristimo sve osim lozinke
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
