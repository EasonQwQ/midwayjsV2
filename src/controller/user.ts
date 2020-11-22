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
import { UserService } from '../service/user';
const axios = require('axios');
@Provide()
@Controller('/user')
export class UserController {
  @Inject()
  ctx: Context;

  @Plugin()
  jwt;

  @Plugin()
  http;

  @Inject()
  userService: UserService;

  @Post('/login')
  async loginByCode(@Body('code') code: string) {
    const openid = await this.userService.getOpenIdByCode(code);

    const aaa = await axios('http://101.132.187.226:7001/user/');
    console.log('UserService -> getOpenIdByCode -> aaa', aaa);
    console.log('UserController -> loginByCode -> openid', openid);
    this.ctx.body = {
      token: this.jwt.sign({ name: 'tome' }),
    };
  }

  @Get('/')
  async getUser() {
    this.ctx.body = {
      data: this.ctx.state.user,
    };
  }
}
