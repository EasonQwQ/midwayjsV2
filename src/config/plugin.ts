import { EggPlugin } from 'egg';
export default {
  static: false, // default is true
  jwt: {
    enable: true,
    package: 'egg-jwt',
  },
} as EggPlugin;
