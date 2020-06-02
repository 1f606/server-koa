const Router = require('koa-router')
const router = new Router({
  prefix: '/v1/classic'
})
const validator = require('validator')
const { Auth } = require('../../middlewares/auth')

router.get('/latest', new Auth(9).m,(ctx, next) => {
  ctx.body = ctx.auth.uid
})

module.exports = router
