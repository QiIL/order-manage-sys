import nconf from 'nconf';
import mongoose from 'mongoose';
mongoose.Promise = global.Promise;
mongoose.connect(nconf.get('mongodb'), {
  promiseLibrary: global.Promise
});
export default mongoose;
