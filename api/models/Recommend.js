import mongoose, { Schema } from 'mongoose';
const ObjectId = Schema.Types.ObjectId;

const RecommendSchema = new Schema({
  fromUserId: { type: ObjectId, ref: 'User' }, // 推荐人id
  toUserId: { type: ObjectId, ref: 'User' }, // 被推荐人id
  createAt: { type: Date, default: Date.now() } // 创建时间
}, {
  versionKey: false,
  toJSON: {
    transform: function (doc, ret) {
      ret.id = ret._id;
      delete ret._id;
    }
  }
});

RecommendSchema.index({ fromUserId: -1 });
RecommendSchema.index({ toUserId: -1 });
RecommendSchema.index({ createAt: -1 });

export default mongoose.model('Recommend', RecommendSchema);
