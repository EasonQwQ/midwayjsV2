import { Config, Inject, Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Order } from './../entity/order';
import { IUserOptions } from '../interface';
import { Repository } from 'typeorm';
const axios = require('axios');
import { Context } from 'egg';
@Provide()
export class OrderService {
  @InjectEntityModel(Order)
  userModel: Repository<Order>;

  @Config()
  weapp;

  @Inject()
  ctx: Context;

  async getUser(options: IUserOptions) {
    return {
      uid: options.uid,
      username: 'mockedName',
      phone: '12345678901',
      email: 'xxx.xxx@xxx.com',
    };
  }

  async addUser() {
    const user = new Order();
    user.orderId = '123';
    const res = await this.userModel.save(user);
    return res;
  }

  async getUserById(id) {
    const user = await this.userModel.find({
      where: {
        id: id,
      },
    });
    return user;
  }

  /**
   * 根据code和腾讯服务器交互换取openid
   * @param code 微信小程序登录时传的code
   */
  async getOpenIdByCode(code: string) {
    const weapp = this.weapp;
    const openIdFormWechat = await axios.get(
      `https://api.weixin.qq.com/sns/jscode2session?appid=${weapp.appId}&secret=${weapp.secret}&js_code=${code}&grant_type=authorization_code`
    );
    return openIdFormWechat;
  }
}
