import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export type DefaultConfig = PowerPartial<EggAppConfig>;

export default (appInfo: EggAppInfo) => {
  const config = {} as DefaultConfig;

  config.security = {
    csrf: false,
  };
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1605784587672_9688';

  // add your config here
  config.middleware = ['authToken', 'errorHandle'];

  config.jwt = {
    enable: true,
    secret: 'test123456',
    ignore: ['/login', '/swagger-ui'],
  };
  config.authToken = {
    whiteUrls: ['/user/login', '/url', '/login'],
  };

  config.orm = {
    type: 'mysql',
    host: '124.70.183.169',
    port: 3306,
    username: 'root',
    password: 'mysql123456.',
    database: 'typescript',
    timezone: '+08:00',
    synchronize: true,
    logging: false,
  };

  config.weapp = {
    appId: 'wx286307c0099d09d7',
    secret: '402e6c66d21c6a47bc5aa485a2a52441',
  };

  config.cos = {
    SecretId: 'AKID97rNYUYEICrJXapy5VfgT1KOuBD4M6HI',
    SecretKey: 'yC7oyveDdt3zg6R1NXTBgx47xZfXAaor',
    Bucket: 'outdoor-1255632723',
    Region: 'ap-nanjing',
  };

  config.mianbaoduo = {
    xToken: '381445:1kk3FH:VNUCPq6PTlHxgBh7HNSX-5LuxLw',
  };

  config.systemConfig = {
    imageBaseUrl: 'https://outdoor-1255632723.cos.ap-nanjing.myqcloud.com',
  };

  config.onerror = {
    all(err, ctx) {
      console.log('url: ', ctx.request.url);
      console.log('all -> err', err);
      if ((err.status + '').startsWith('4')) {
        ctx.body = 'UnauthorizedError 授权错误';
        ctx.status = err.status;
      } else {
        ctx.body = 'error 服务器错误';
        ctx.status = err.status;
      }
    },
  };

  return config;
};
