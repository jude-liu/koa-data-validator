'use strict';

const Ajv = require('ajv');

const Util = require('./util');

class AjvWrapper {
  constructor() {
    this.schemas = {};
    this.ajv = new Ajv();
  }

  /**
   * Register new schema to ajv instance.
   * @param {String} name schema name
   * @param {Object} schema schema entity
   * @param {Object} options other related parameters
   */
  registerSchema(name, schema, options) {
    if (typeof name !== 'string') throw TypeError('parameter name must be String type');
    if (Util.getDataType(schema) !== 'Object') throw TypeError('parameter schema must be Object type');
    if (this.schemas[name]) throw Error(`schema '${name}' has already been registered`);
    if (!options || Util.getDataType(options) !== 'Object') options = {};

    let schemaObj = { validate: this.ajv.compile(schema) };

    this.schemas[name] = Object.assign(schemaObj, options);
  }
}

module.exports = new AjvWrapper();
