import {
  Inject,
  Controller,
  Provide,
  Get,
  Put,
  Body,
} from '@midwayjs/decorator';
// import { CreateApiDoc } from '@midwayjs/swagger';
import { Context } from 'egg';
import { UserService } from '../service/user';
@Provide()
@Controller('/user', { tagName: 'User', description: '关于用户信息的操作' })
export class UserController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Get('/')
  async getUser() {
    return { code: 1, data: this.ctx.state.user };
  }

  @Put('/')
  async updateUserInfo(@Body() userDetail: object) {
    const uid = this.ctx.state.user.id;
    const user = await this.userService.updateUserDetail(uid, userDetail);
    console.log('user: ', user);
  }
}
