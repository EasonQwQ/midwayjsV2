import { Config, Inject, Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { User } from './../entity/user';
import { IUserOptions } from '../interface';
import { Repository } from 'typeorm';
const axios = require('axios');
import { Context } from 'egg';
// const axios = require('axios');
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

    console.log('UserService -> addUser -> user', user);
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
    console.log('UserService -> getOpenIdByCode -> code', code);
    const weapp = this.weapp;
    console.log('UserService -> getOpenIdByCode -> weapp.secret', weapp.secret);
    console.log('UserService -> getOpenIdByCode -> weapp.appId', weapp.appId);
    // const openIdFormWechat = await axios.get(
    //   `https://api.weixin.qq.com/sns/jscode2session?appid=${weapp.appId}&secret=${weapp.secret}&js_code=${code}&grant_type=authorization_code`
    // );

    const aaa = await axios.get('http://www.baidu.com');
    console.log('🚀 ', aaa);
    return aaa;
  }
}
