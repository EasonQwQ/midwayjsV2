import {
  Inject,
  Controller,
  Post,
  Provide,
  Get,
  Plugin,
  Body,
} from '@midwayjs/decorator';
import { Context } from 'egg';
import { OrderService } from '../service/order';
@Provide()
@Controller('/order')
export class OrderController {
  @Inject()
  ctx: Context;

  @Plugin()
  jwt;

  @Inject()
  userService: OrderService;

  @Post('/login')
  async loginByCode(@Body('code') code: string) {
    const openid = await this.userService.getOpenIdByCode(code);
    this.ctx.body = {
      token: this.jwt.sign({ name: 'tome' }),
      openid: openid,
    };
  }

  @Get('/')
  async getUser() {
    this.ctx.body = {
      data: this.ctx.state.user,
    };
  }
}
