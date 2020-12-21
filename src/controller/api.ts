import {
  Inject,
  Controller,
  Post,
  Provide,
  Query,
  Get,
  Config,
} from '@midwayjs/decorator';
import { Context } from 'egg';
import { UserService } from '../service/user';

@Provide()
@Controller('/api')
export class APIController {
  @Inject()
  ctx: Context;

  @Inject()
  userService: UserService;

  @Config()
  systemConfig;

  @Post('/get_user')
  async getUser(@Query() uid) {
    const user = await this.userService.getUser({ uid });
    return { success: true, message: 'OK', data: user };
  }

  @Get('/add')
  async addUser() {
    const user = await this.userService.addUser();
    return { success: true, message: 'ok', data: user };
  }

  @Get('/config')
  async getConfig() {
    return { code: 1, data: this.systemConfig };
  }

  // @Get('/:id')
  // async getUserById(@Param() id: number) {
  //   const res = await this.userService.getUserById(id);
  //   return { success: true, message: 'ok', data: res };
  // }
}
