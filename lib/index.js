'use strict';

const ajvWrapper = require('./ajv');
const Collector = require('./collector');

// single instance of Collector
let _collector = null;
let mapping = {};

class Validator {

  static addAjvFormat() {

  }

  static registerAPIModule(dir) {
    if (typeof dir !== 'string') throw TypeError('dir must be String type');
    _collector = new Collector(dir);
  }

  static registerAjvSchema(schemaName, schema) {
    ajvWrapper.registerSchema(schemaName, schema);
  }
}

Validator.ajv = ajvWrapper.ajv;

module.exports = Validator;
