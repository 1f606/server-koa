const Router = require('koa-router')
const { Auth } = require('../../middlewares/auth')
const router = new Router({
  prefix: '/v1/user'
})
const { TokenValidator, NotEmptyValidator } = require('../../validators/validator')
const { LoginType } = require('../../lib/enum')
const { User } = require('../../models/user')
const { generateToken } = require('../../lib/utils')
const { WXManager } = require('../../services/wx')

router.post('/token', async (ctx, next) => {
  TokenValidator(ctx.request.body)
  let token
  switch (Number(ctx.request.body.type)) {
    case LoginType.USER_EMAIL:
      token = await emailLogin(ctx.request.body.email, ctx.request.body.password)
      break
    case LoginType.USER_MINI_PROGRAM:
      token = await WXManager.codeToToken(ctx.request.body.email)
      break
    default:
      break
  }
  ctx.body = {
    token
  }
})

router.post('/verify', async (ctx, next) => {
  const body = ctx.request.body
  new NotEmptyValidator(body.token)
  const result = Auth.verifyToken(body.token)
  ctx.body = {
    result
  }
})

async function emailLogin (email, pwd) {
  const user = await User.verifyEmailPassword(email, pwd)
  return generateToken(user.id, Auth.USER)
}

module.exports = router
