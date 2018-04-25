'use strict';

export default () => {
  return async (ctx, next) => {
    try {
      console.log('aaaa');
      await next();
      console.log('bbb');
    } catch (error) {
      console.log(error);
      ctx.body = {
        code: 500,
        error: error.message
      };
    }
  };
};
