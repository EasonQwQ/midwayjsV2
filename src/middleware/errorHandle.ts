import { Provide } from '@midwayjs/decorator';
import { IWebMiddleware, IMidwayWebNext } from '@midwayjs/web';
import { Context } from 'egg';
@Provide()
export class ErrorHandle implements IWebMiddleware {
  resolve() {
    return async (ctx: Context, next: IMidwayWebNext) => {
      try {
        await next();
      } catch (err) {
        console.log('ErrorHandle -> resolve -> err', err);
        if (err.name === 'UnauthorizedError') {
          ctx.body = {
            code: 401,
            massage: '请登录后再进行操作',
          };
        }
      }
    };
  }
}
