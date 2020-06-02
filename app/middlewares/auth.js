const basicAuth = require('basic-auth')
const jwt = require('jsonwebtoken')

class Auth {
  constructor(level) {
    this.level = level || 1
    Auth.USER = 8
    Auth.ADMIN = 16
    Auth.SUPER_ADMIN = 32
  }

  get m() {
    return async (ctx, next) => {
      const userToken = basicAuth(ctx.req)
      let decode
      if (!userToken || !userToken.name) {
        throw new global.errs.Forbidden('token不合法')
      }
      try {
        decode = jwt.verify(userToken.name, global.customConfig.PRIVATE_KEY)
      } catch (e) {
        if (e.name === 'TokenExpiredError') {
          throw new global.errs.Forbidden('token已过期')
        }
        throw new global.errs.Forbidden('token不合法')
      }
      if (decode.scope < this.level) {
        throw new global.errs.Forbidden('权限不足')
      }
      ctx.auth = {
        uid: decode.uid,
        scope: decode.scope
      }
      await next()
    }
  }

  static verifyToken(token) {
    try {
      jwt.verify(token, global.customConfig.PRIVATE_KEY)
      return true
    } catch (e) {
      return false
    }
  }
}

module.exports = {
  Auth
}
