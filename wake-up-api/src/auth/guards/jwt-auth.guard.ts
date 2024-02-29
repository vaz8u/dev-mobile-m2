import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth.service';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from 'src/decorators';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private reflector: Reflector,
    private readonly authService: AuthService,
  ) {
    super();
  }

  handleRequest(err, user, info, context, status) {
    return super.handleRequest(err, user, info, context, status);
  }

  getRequest(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const tmp = super.canActivate(context);
    const resPromise = Promise.resolve(tmp);

    return resPromise.then((value) => {
      if (!value) return false;

      const req = this.getRequest(context);

      const jwt = req.headers.authorization.replace('Bearer', '').trim();

      const res = this.authService.shouldBlock(jwt);

      return res;
    });
  }
}
