import { Inject, Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Drive } from './../entity/drive';
import { Repository } from 'typeorm';
import { Context } from 'egg';
@Provide()
export class DriveService {
  @InjectEntityModel(Drive)
  driveModel: Repository<Drive>;

  @Inject()
  ctx: Context;

  async getAllDrive(uid: number) {
    const res = await this.driveModel.findAndCount();
    return res;
  }

  async getDriveByUid(uid: number) {
    const res = await this.driveModel.findOne({
      where: {
        uid: uid,
      },
    });
    return res;
  }

  async getDriveByActivityId(activityId) {
    const res = await this.driveModel.find({
      where: {
        activityId,
        status: 0, // 正常状态
        type: 1, // 开车
      },
    });
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
