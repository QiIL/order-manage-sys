'use strict';
import '../config/nconf';
import '../config/mongoose';
import app from '../config/koa';
const request = require('supertest').agent(app.callback());

export default {
  request
};
