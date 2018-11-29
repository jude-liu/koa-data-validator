'use strict';

const Util = require('../lib/util');

test('get target data type', () => {
  let target = 1;
  let type = Util.getDataType(target);
  expect(type).toBe('Number');

  target = '1';
  type = Util.getDataType(target);
  expect(type).toBe('String');

  target = true;
  type = Util.getDataType(target);
  expect(type).toBe('Boolean');

  target = undefined;
  type = Util.getDataType(target);
  expect(type).toBe('Undefined');

  target = null;
  type = Util.getDataType(target);
  expect(type).toBe('Null');

  target = new Object();
  type = Util.getDataType(target);
  expect(type).toBe('Object');

  target = new Array();
  type = Util.getDataType(target);
  expect(type).toBe('Array');

  target = new Map();
  type = Util.getDataType(target);
  expect(type).toBe('Map');
});
