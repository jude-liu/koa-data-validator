'use strict';

class Util {
  static getDataType(target) {
    // basic type, String Number Boolean Symbol undefined null
    // reference type, Object
    let type = Object.prototype.toString.call(target);
    type = type.replace(/^\[object /, '');
    type = type.replace(/\]$/, '');
    return type;
  }

  /**
	 * get http request data
	 * @param {Object} ctx koa request context 
	 * @param {String} from where get request data
	 */
  static getRequestData(ctx, from) {
    if (!ctx) throw TypeError('parameter ctx is invalid');
    if (ctx.method !== 'GET') {
      from = from || 'body';
      return ctx.request[from];
    } else {
      from = from || 'query';
      return ctx[from];
    }
  }
}

module.exports = Util;
