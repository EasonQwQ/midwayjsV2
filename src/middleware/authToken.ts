import { Provide, Plugin } from '@midwayjs/decorator';
import { IWebMiddleware, IMidwayWebNext } from '@midwayjs/web';
import { Context } from 'egg';
import { Config } from '@midwayjs/decorator';
@Provide()
export class AuthToken implements IWebMiddleware {
  @Config('authToken')
  authToken;

  @Config('jwt')
  jwtConfig;

  @Plugin()
  jwt;

  resolve() {
    return async (ctx: Context, next: IMidwayWebNext) => {
      // const [, token] = ctx.request.header.authorization.split(' ');
      // const { user } = this.jwt.verify(token, this.jwtConfig.secret);
      // if (user) {
      //   await next();
      // } else {
      //   ctx.status = 401;
      // }
      // console.log('<><><><<>><', this.authToken);
      await next();
    };
  }
}
