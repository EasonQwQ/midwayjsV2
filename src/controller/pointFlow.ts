import {
  Inject,
  Controller,
  Provide,
  Get,
  Query,
  Config,
  // Param,
} from '@midwayjs/decorator';
import { Context } from 'egg';
import { mianBaoDuoHttp } from '../util/http';
import { PointFlowService } from '../service/pointFlow';
// const axios = require('axios');
@Provide()
@Controller('/point')
export class PointFlowController {
  @Inject()
  ctx: Context;

  @Config()
  mianbaoduo;

  @Inject()
  pointFlowService: PointFlowService;
  @Get('/exchangePointByOrderId')
  async exchangePointByOrderId(@Query() orderId: string) {
    // 查询这个订单是否存在
    try {
      const res: any = await mianBaoDuoHttp('get', '/order-detail', {
        order_id: orderId,
      });
      if (res.code === 200) {
        // 假如订单存在并且状态为success就是已经付款
        if (res.result.state === 'success') {
          // 查询这个订单id是否存在
          const pointFlow = await this.pointFlowService.findOrderStateByOrderId(
            orderId
          );
          // 假如存在，那么就是已经核销过了
          if (pointFlow) {
            return { code: 0, msg: '此订单已经核销' };
          } else {
            // 不存在 就查询这个订单值多少积分   1积分就是1块钱
            const product: any = await mianBaoDuoHttp(
              'get',
              '/product-detail',
              {
                urlkey: res.result.urlkey,
              }
            );
            // 假如面包多那边返回状态正确
            if (product.code === 200) {
              const {
                productprice: point,
                productname,
                productdetail,
              } = product.result;
              const name = productname + productdetail; // product的名字加detail合并成pointFlow里面的name
              const { id } = this.ctx.state.user;
              try {
                // 增加积分流水
                const createPointFlow = await this.pointFlowService.createPointFlow(
                  id,
                  orderId,
                  point,
                  name
                );
                if (createPointFlow) {
                  return { code: 1, msg: '' };
                } else {
                  return {
                    code: 0,
                    msg: '增加积分错误，请联系技术支持17895097040',
                  };
                }
              } catch (error) {
                return {
                  code: 0,
                  msg: '增加积分错误，请联系技术支持17895097040',
                };
              }
            }
          }
        } else {
          return { code: 0, msg: '订单未支付' };
        }
      }
    } catch (error) {
      return { code: 0, msg: '没有找到这个订单' };
    }
  }
}
