import mongoose, { Schema } from 'mongoose';
import crypto from 'crypto';
import bcrypt from 'bcrypt';
import nconf from 'nconf';
const saltRound = 10;

const UserSchema = new Schema({
  userName: { type: String, required: true, unique: true }, // 登录名
  password: { type: String, required: true }, // 密码(加盐哈希)
  nickname: { type: String, required: true }, // 昵称
  avatar: { type: String, required: true }, // 头像
  sign: { type: String }, // 个性签名
  managerId: { type: String }, // 上级id
  app_secret: { type: String, default: GetHmac() }, // token用
  create_at: { type: Date, default: Date.now() }, // 创建时间
  update_at: { type: Date, default: Date.now() } // 更新时间
}, {
  versionKey: false,
  toJSON: {
    transform: function (doc, ret) {
      ret.id = ret._id;
      delete ret._id;
    }
  }
});

function GetHmac (params) {
  const hmac = crypto.createHmac('sha256', nconf.get('secret_key'));
  hmac.update(Date.now().toString());
  return hmac.digest('hex');
}

UserSchema.pre('save', async function (next) {
  try {
    const user = this;
    if (!user.isModified('password')) return next();
    const salt = await bcrypt.genSalt(saltRound);
    const hash = await bcrypt.hash(this.password, salt);
    user.password = hash;
    return next();
  } catch (err) {
    return next(err);
  }
});

UserSchema.methods.comparePassword = async function (password) {
  const isMatch = await bcrypt.compare(password, this.password);
  return isMatch;
};

UserSchema.statics.findByName = async function (userName) {
  const user = await this.findOne({
    user_name: userName
  });
  return user;
};

UserSchema.statics.checkToken = async function (token) {
  // const user = await this.findOne({ _id: token.id })
  const user = await this.findById(token.id);
  if (token.secret === user.app_secret) {
    return user;
  } else {
    throw Error('验证未通过!');
  }
};

UserSchema.statics.checkAndUpdateToken = async function (token) {
  const secret = GetHmac();
  // const user = await this.findOne({ _id: token.id })
  const user = await this.findOneAndUpdate(
    { _id: token.id },
    { app_secret: secret }
  );
  if (token.secret === user.app_secret) {
    user.app_secret = secret;
    return user;
  } else {
    throw Error('验证未通过!');
  }
};

export default mongoose.model('User', UserSchema);