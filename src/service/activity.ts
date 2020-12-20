import { Inject, Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Activity } from './../entity/activity';
import { Repository } from 'typeorm';
import { Context } from 'egg';
@Provide()
export class ActivityService {
  @InjectEntityModel(Activity)
  activityModel: Repository<Activity>;

  @Inject()
  ctx: Context;

  async getAllActivity(uid: number) {
    const res = await this.activityModel.findAndCount();
    return res;
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
}
