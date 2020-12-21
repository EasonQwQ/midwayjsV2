import { Config, Inject, Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { User } from './../entity/user';
import { IUserOptions } from '../interface';
import { Repository } from 'typeorm';
const axios = require('axios');
import { Context } from 'egg';
@Provide()
export class UserService {
  @InjectEntityModel(User)
  userModel: Repository<User>;

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
    const user = new User();
    user.openid = '123';
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

  /**
   * 查询这个openid 有的话返回这个user 没有的话创建
   * @param openid
   */
  async findOrCreate(openid) {
    const user = await this.userModel.findOne({ where: { openid } });
    if (user) {
      return user;
    } else {
      const newUser = new User();
      newUser.openid = openid;
      const tempUser = await this.userModel.save(newUser);
      if (tempUser) {
        return tempUser;
      } else {
        throw new Error('生成user错误');
      }
    }
  }

  /**
   * 更新用户的详细信息
   * @param userDetail 用户的详细信息
   */
  async updateUserDetail(uid: number, userDetail: object) {
    const userToUpdate = await this.userModel.findOne(uid);
    userToUpdate.userDetail = userDetail;
    const res = await this.userModel.save(userToUpdate);
    return res;
  }
}
