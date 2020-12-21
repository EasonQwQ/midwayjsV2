import { Inject, Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { PointFlow } from './../entity/pointFlow';
import { User } from './../entity/user';
import { Repository, getManager } from 'typeorm';
import { Context } from 'egg';
@Provide()
export class PointFlowService {
  @InjectEntityModel(PointFlow)
  pointFlowModel: Repository<PointFlow>;

  @InjectEntityModel(User)
  userModel: Repository<User>;

  @Inject()
  ctx: Context;

  async findOrderStateByOrderId(orderId) {
    const pointFlow = await this.pointFlowModel.findOne({
      where: {
        orderId: orderId,
      },
    });
    // if (pointFlow) {
    // }
    return pointFlow;
  }

  /**
   * 创建一条积分流水
   * @param uid
   * @param orderId
   * @param point
   * @param name
   */
  async createPointFlow(
    uid: number,
    orderId: string,
    point: number,
    name: string
  ) {
    // 开启事务
    const res = await getManager().transaction(
      async transactionalEntityManager => {
        // 先根据uid从数据库找到user
        const user = await this.userModel.findOne(uid);
        // 新增PointFlow
        const pointFlow = new PointFlow();
        pointFlow.uid = uid;
        pointFlow.orderId = orderId;
        pointFlow.point = point;
        pointFlow.name = name;
        pointFlow.currentPoint = point + user.point;
        // 增加这个pointFlow
        await transactionalEntityManager.save(PointFlow, pointFlow);
        user.point = user.point + point;
        // 给user增加积分，这里面只要出错就会回滚
        const updateUser = await transactionalEntityManager.save(User, user);
        return updateUser;
      }
    );
    return res;
  }
}
