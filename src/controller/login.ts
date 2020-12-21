import {
  Inject,
  Controller,
  Post,
  Provide,
  // Query,
  Get,
  Param,
  Body,
  Plugin,
} from '@midwayjs/decorator';
import { CreateApiDoc } from '@midwayjs/swagger';
import { Context } from 'egg';
import { UserService } from '../service/user';

@Provide()
@Controller('/login', { tagName: 'login', description: '登录接口' })
export class LoginController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Plugin()
  jwt;

  @(CreateApiDoc()
    .summary('微信小程序登录接口')
    .description('根据code返回token')
    .param('code', { required: true })
    .build())
  @Post('/weapp')
  async loginByCode(@Body('code') code: string) {
    const res = await this.userService.getOpenIdByCode(code);
    const { openid } = res && res.data;
    if (openid !== undefined) {
      const user = await this.userService.findOrCreate(openid);
      return { code: 1, data: this.jwt.sign({ ...user }) };
    } else {
      return { code: 0, msg: '获取openid失败' };
    }
  }

  // @Post('/weapp')
  // async getUser(@Query() uid) {
  //   const user = await this.userService.getUser({ uid });
  //   return { success: true, message: 'OK', data: user };
  // }

  @Get('/add')
  async addUser() {
    const user = await this.userService.addUser();
    return { success: true, message: 'ok', data: user };
  }

  @Get('/:id')
  async getUserById(@Param() id: number) {
    const res = await this.userService.getUserById(id);
    return { success: true, message: 'ok', data: res };
  }
}
