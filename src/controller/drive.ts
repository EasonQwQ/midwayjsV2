import {
  Inject,
  Controller,
  Provide,
  Get,
  // Put,
  // Body,
  Query,
} from '@midwayjs/decorator';
// import { CreateApiDoc } from '@midwayjs/swagger';
import { Context } from 'egg';
import { DriveService } from '../service/drive';
import { formatReturnSuccess } from '../util/helper';
@Provide()
@Controller('/drive', { tagName: 'Drive', description: '关于用户信息的操作' })
export class DriveController {
  @Inject()
  ctx: Context;

  @Inject()
  driveService: DriveService;

  @Get('/')
  async getMyDrive() {
    const { id } = this.ctx.state.user;
    // console.log('activityId: ', activityId);
    const res = await this.driveService.getDriveByUid(id);
    return formatReturnSuccess(res);
  }

  @Get('/activity')
  async getDrive(@Query('activityId') activityId: number) {
    console.log('activityId: ', activityId);
    const res = await this.driveService.getDriveByActivityId(activityId);
    return formatReturnSuccess(res);
  }

  // @Put('/')
  // async updateUserInfo(@Body() userDetail: object) {
  //   const uid = this.ctx.state.user.id;
  //   const user = await this.userService.updateUserDetail(uid, userDetail);
  //   console.log('user: ', user);
  // }
}
