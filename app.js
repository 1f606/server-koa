const Koa = require('koa')
const app = new Koa()
const parser = require('koa-bodyparser')
const InitManager = require('./app/core/init')
const catchError = require('./app/middlewares/exception')

app.use(parser())

app.use(catchError)
InitManager.initCore(app)

app.listen(3000)
