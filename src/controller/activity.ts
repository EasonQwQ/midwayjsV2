import { Inject, Controller, Provide, Get } from '@midwayjs/decorator';
import { Context } from 'egg';
import { ActivityService } from '../service/activity';

@Provide()
@Controller('/activity')
export class ActivityController {
  @Inject()
  ctx: Context;

  @Inject()
  activityService: ActivityService;

  @Get('/all')
  async getAllActivity() {
    const { uid } = this.ctx.state.user;
    const allActivity = await this.activityService.getAllActivity(uid);
    return { code: 1, message: 'OK', data: allActivity };
  }
}
