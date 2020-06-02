const Router = require('koa-router')
const router = new Router({
  prefix: '/v1/user'
})
const { regValidator } = require('../../validators/validator')
const { User } = require('../../models/user')

router.post('/register', async(ctx, next) => {
  //  昵称密码长度在6-32之间，
  const res = await regValidator.validate(ctx.request.body)
  if (res) {
    throw new global.errs.ParameterException('邮箱重复')
  }
  const user = {
    email: ctx.request.body.email,
    password: ctx.request.body.password1,
    nickname: ctx.request.body.nickname,
    openid: ctx.request.body.openid
  }
  await User.create(user)
  throw new global.errs.Success('注册成功')
})

module.exports = router
