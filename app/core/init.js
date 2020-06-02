const requireDirectory = require('require-directory')
const Router = require('koa-router')

class InitManager {
  static initCore(app) {
    InitManager.app = app
    InitManager.initRouters()
    InitManager.loadHttpException()
    global.customConfig = require('../config/config')
  }

  static initRouters() {
    requireDirectory(module, `${process.cwd()}/app/api`, {
      visit: function whenLoadModule (obj) {
        if (obj instanceof Router) {
          InitManager.app.use(obj.routes())
        }
      }
    })
  }

  static loadHttpException() {
    global.errs = require('./HttpException')
  }
}

module.exports = InitManager
