import { ExecutionContext, Injectable, Inject } from '@nestjs/common';
import { Observable } from 'rxjs';
import { RolesGuard } from './role.guard';
import { IgracService } from 'src/igrac/igrac.service';

@Injectable()
export class VodjaGuard extends RolesGuard {
  @Inject(IgracService)
  igracService: IgracService;
  override canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    const user = req.user;
    return this.igracService.findOne(user.username).then((user) => {
      return user?.vodjaTima;
    });
  }
}
