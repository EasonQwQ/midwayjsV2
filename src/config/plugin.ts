import { EggPlugin } from 'egg';
export default {
  static: false, // default is true
  jwt: {
    enable: true,
    package: 'egg-jwt',
  },
  http: {
    enable: true,
    package: 'egg-axios',
  },
} as EggPlugin;
