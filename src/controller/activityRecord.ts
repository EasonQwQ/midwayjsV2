import {
  Inject,
  Controller,
  Provide,
  Get,
  Post,
  Body,
  Query,
} from '@midwayjs/decorator';
import { Context } from 'egg';
import { ActivityRecordService } from '../service/activityRecord';
import { formatReturnSuccess } from '../util/helper';

@Provide()
@Controller('/activityRecord')
export class ActivityRecordController {
  @Inject()
  ctx: Context;

  @Inject()
  activityRecordService: ActivityRecordService;

  @Get('/all')
  async getAllActivityRecord() {
    const allActivityRecord = await this.activityRecordService.getAllActivityRecord();
    return { code: 1, message: 'OK', data: allActivityRecord };
  }

  /**
   * 创建活动记录
   * @param activityId 活动id
   */
  @Post('/create')
  async createActivityRecord(@Body('activityId') activityId: number) {
    const { id: uid } = this.ctx.state.user;
    const record = await this.activityRecordService.createRecord(
      uid,
      activityId
    );
    if (record) {
      return { code: 1, data: record };
    } else {
      return { code: 0, msg: '你已经报过名' };
    }
  }

  @Get('/')
  async getRecord(@Query('activityId') activityId: number) {
    const res = await this.activityRecordService.getByActivityId(activityId);
    return formatReturnSuccess(res);

    // console.log('activityId: ', activityId);
  }
}
