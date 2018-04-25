'use strict';
import Goods from '../models/Goods';

const addGoods = async ctx => {
  // 验证
  ctx.verifyParams({
    name: 'string',
    price: 'number',
    picture: 'array',
    des: 'string'
  });
  // 添加商品逻辑
  const body = ctx.request.body;
  const a = new Goods({
    name: body.name,
    price: body.price,
    picture: body.picture,
    des: body.des
  });
  await a.save();
  ctx.body = {
    code: 200,
    msg: '创建商品成功！'
  };
};

export {
  addGoods
};
