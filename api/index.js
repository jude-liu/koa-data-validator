const Validator = require('../lib/index');

Validator.ajv.addFormat('cusStr', {
  type: 'string',
  validate: val => {
    return /^[a-z][0-9]{3}$/.test(val);
  }
});

Validator.registerAjvSchema('getUserSelfInfo', {
  type: 'object',
  properties: {
    name: { type: 'string', maxLength: 10 },
    avatarUrl: { type: 'string', format: 'cusStr' }
  },
  minProperties: 1,
  additionalProperties: false
});
exports.getUserSelfInfo = async function (ctx, next) {
  if (ctx.request.errors) {
    ctx.status = 400;
    ctx.body = {
      msg: 'error'
    };
    return;
  }
  ctx.body = 'success';
};
