'use strict';

const Koa = require('koa');
const http = require('http');
const Router = require('koa-router');
const request = require('supertest');
const bodyParser = require('koa-bodyparser');

const DV = require('../lib/index');
const indexAPI = require('../api/index');

DV.registerAPIModule('./api');

let server;

beforeAll((done) => {
  let app = new Koa();

  app.use(bodyParser());
  app.use(async (ctx, next) => {
    await next();
  });

  let router = new Router();

  router.get('/get/userinfo', indexAPI.getUserSelfInfo);

  app.use(router.routes());

  server = http.createServer(app.callback());
  server.listen();
  server.on('listening', () => {
    done();
  });
});

test('api module load', (done) => {
  request(server)
    .get('/get/userinfo')
    .query({ name: 'ddd' })
    .then(res => {
      if (res.error) {
        expect(res.status).toBe(400);
        expect(res.body.msg).toBe('error');
        return done();
      }
      expect(res.text).toBe('success');
      done();
    });
});
