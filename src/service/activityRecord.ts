import { Inject, Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { ActivityRecord } from './../entity/activityRecord';
import { Activity } from './../entity/activity';
import { User } from '../entity/user';
import { Repository } from 'typeorm';
import { Context } from 'egg';
@Provide()
export class ActivityRecordService {
  @InjectEntityModel(ActivityRecord)
  activityRecordModel: Repository<ActivityRecord>;

  @InjectEntityModel(User)
  userModel: Repository<User>;

  @InjectEntityModel(Activity)
  activityModel: Repository<Activity>;

  @Inject()
  ctx: Context;

  async getAllActivityRecord() {
    const res = await this.activityRecordModel.findAndCount();
    return res;
  }

  /**
   * 新增一条活动记录
   * @param uid 用户id
   * @param activityId 活动id
   */
  async createRecord(uid: number, activityId: number) {
    try {
      // 根据uid查找用户
      const user = await this.userModel.findOne(uid);
      // 根据activityId查找活动
      const activity = await this.activityModel.findOne(activityId);
      // 创建活动记录
      const activityRecord = new ActivityRecord();
      // 绑定用户和活动
      activityRecord.status = 1;
      activityRecord.user = user;
      activityRecord.activity = activity;
      const res = await this.activityRecordModel.save(activityRecord);
      return res;
    } catch (error) {
      return false;
    }
  }

  // async addUser() {
  //   const user = new Order();
  //   user.orderId = '123';
  //   const res = await this.userModel.save(user);
  //   return res;
  // }

  // async getUserById(id) {
  //   const user = await this.userModel.find({
  //     where: {
  //       id: id,
  //     },
  //   });
  //   return user;
  // }

  async getByActivityId(activityId: number) {
    const res = await this.activityRecordModel.findOne({
      where: {
        activity: activityId,
      },
    });
    return res;
  }
}
