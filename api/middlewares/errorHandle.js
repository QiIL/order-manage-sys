'use strict';

export default () => {
  return async (ctx, next) => {
    try {
      await next();
    } catch (error) {
      ctx.body = {
        code: 500,
        error: error.message
      };
    }
  };
};
