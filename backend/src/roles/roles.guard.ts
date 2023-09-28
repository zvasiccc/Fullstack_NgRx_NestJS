import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './role.enum';
import { ROLES_KEY, Roles } from './roles.decorator';
import { JwtService } from '@nestjs/jwt';
import { IgracService } from 'src/igrac/igrac.service';
import { OrganizatorService } from 'src/organizator/organizator.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private igracService: IgracService,
    private organizatorService: OrganizatorService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }
    const token = context
      .switchToHttp()
      .getRequest()
      .headers.authorization.split(' ')[1]; //on ide beaerer token, zato vracamo ono iza praznog mesta tj token
    const decoded = this.jwtService.verify(token, {
      secret: 'SECRET',
    }) as any;
    if (requiredRoles.includes(Role.Igrac)) {
      //todo ako sadrzi rolu igrac onda radi ovo
      console.log(decoded);
      let i = await this.igracService.findOne(decoded.username);
      console.log(i);
      return i !== null;
    }
    if (requiredRoles.includes(Role.Organizator)) {
      let o = await this.organizatorService.findOne(decoded.username);
      return o !== null;
    }
    //todo isto za ostale role
  }
}
