import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IgracEntity } from 'src/igrac/igrac.entity';
import { IgracService } from 'src/igrac/igrac.service';
import { OrganizatorEntity } from 'src/organizator/organizator.entity';
import { OrganizatorService } from 'src/organizator/organizator.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private igracService: IgracService,
    private organizatorService: OrganizatorService,
    private jwtService: JwtService,
  ) {}

  // async validateUser(email: string, pass: string): Promise<any> {
  //   const user = await this.usersService.findOne(email);
  //   if(user) {
  //     const isMatchs = await bcrypt.compare(pass, user.password);
  //     if(isMatchs) {
  //       const { password, ...result } = user;
  //       return result;
  //     }
  //   }
  //   return null;
  // }
  async validateUser(username: string, pass: string): Promise<any> {
    let user: IgracEntity | OrganizatorEntity | undefined =
      await this.igracService.findOne(username);
    if (!user) {
      user = await this.organizatorService.findOne(username);
      const isMatchs = await bcrypt.compare(pass, user.lozinka);
    }
    if (user) {
      const isMatchs = await bcrypt.compare(pass, user.lozinka);
      if (isMatchs) {
        const { lozinka, ...userBezLozinke } = user;

        return {
          ...userBezLozinke,
          role: user instanceof IgracEntity ? 'igrac' : 'organizator',
        }; //koristimo sve osim lozinke
      }
    }

    return null;
  }

  async login(korisnik: any) {
    console.log(korisnik);
    const payload = {
      username: korisnik.korisnickoIme,
      sub: korisnik.id,
      role: korisnik.role,
    };
    return {
      access_token: this.jwtService.sign(payload),
      korisnik: korisnik,
    };
  }
}
