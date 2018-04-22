'use strict';

import Router from 'koa-router';
// const fs = require('fs')
// const os = require('os')
// const path = require('path')

/** 中间件导入 */
// import { errorHandle, checkToken } from '../api/middlewares/index';

/** 资源路由 */
const router = new Router();
/** restful api 路由 */
const commonRouter = new Router();
/** 监权路由 */
const authRouter = new Router();

/** 路由前缀 */
router.prefix('/api');
commonRouter.prefix('/v1');
authRouter.prefix('/auth');

/** 通用路由中间件 */
// router.use(errorHandle());

/** 平常路由中间件 */

/** 监权路由中间件 */

/** 路由编写 */

/** 整合路由 */
router.use(commonRouter.routes(), commonRouter.allowedMethods());
router.use(authRouter.routes(), authRouter.allowedMethods());

export default router;
