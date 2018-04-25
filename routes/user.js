import { login, register } from '../api/controller/user';

module.exports = (router, authRouter, commonRouter) => {
  // 登录
  commonRouter.post('/login', login);
  // 注册
  commonRouter.post('/register', register);
  // 获取当前用户信息
  // authRouter.get('/user', userController.getUserInfo);
  // 修改密码
  // commonRouter.post('/changePassword', UserController.changePassword)
};
