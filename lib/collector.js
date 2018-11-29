'use strict';

const fs = require('fs');
const path = require('path');

const ajvWrapper = require('./ajv');
const Util = require('./util');
const debug = require('../lib/debug')('data-validator');

class APIModuleCollector {
  /**
   * constructor function
   * @param {String|Object} param file dir or config object
   */
  constructor(param) {
    if (!param || typeof param !== 'string') throw TypeError(`constructor parameter '${param}' is invalid`);
    // relative path
    this.apiModuleDir = param;
    // info of each api function
    this.apiMapping = {};
    this.loadAPIModule();
  }

  loadAPIModule() {
    let rootDir = path.resolve(process.cwd(), this.apiModuleDir);
    let allFiles = [];

    function traverseDir(rootDir) {
      let dirs = fs.readdirSync(rootDir);
      for(let item of dirs) {
        let itemPath = path.join(rootDir, item);
        let stat = fs.statSync(itemPath);
        if (stat.isDirectory()) {
          traverseDir(itemPath);
        } else {
          allFiles.push(itemPath);
        }
      }
    }

    traverseDir(rootDir);
    allFiles.forEach((file, index) => {
      debug(`loading api module: '${file}'`);
      let apiModule = require(file);
      
      for (let key in apiModule) {
        // registered schema
        let schema = ajvWrapper.schemas[key];
        if (schema && typeof apiModule[key] === 'function') {
          let originalFunc = apiModule[key].bind(apiModule);
          apiModule[key] = async function (ctx, next) {
            // validate request parameters here
            try {
              let data = Util.getRequestData(ctx, schema.from);
              debug(`${ctx.method} request data`, data);
              let isValid = schema.validate(data);
              if (!isValid) {
                ctx.request.errors = schema.validate.errors;
              }
            } catch (err) {
              ctx.request.errors = err;
            }
            return await originalFunc(ctx, next);
          };

          this.apiMapping[key] = {
            path: file,
            // validate: schema
          };
          debug(`add api mapping '${key}'`);
        }
      }
    });
  }
}

module.exports = APIModuleCollector;
