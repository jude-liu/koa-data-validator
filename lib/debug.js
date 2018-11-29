'use strict';

const debug = require('debug');

debug.log = console.info.bind(console);

module.exports = debug;
