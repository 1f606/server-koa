const { HttpException } = require('../core/HttpException')

const catchError = async (ctx, next) => {
  try {
    await next()
  } catch (error) {
    console.log('全局处理异常')
    if (error instanceof HttpException) {
      ctx.body = {
        msg: error.msg,
        errorCode: error.errorCode,
        request: `${ctx.method} ${ctx.path}`
      }
      ctx.status = error.status
    } else {
      console.log('内部错误')
      console.log(error)
      ctx.body = {
        msg: '服务器内部错误',
        errorCode: 99999,
        request: `${ctx.method} ${ctx.path}`
      }
      ctx.status = 500
      if (error.name === 'SequelizeUniqueConstraintError') {
        ctx.body = {
          msg: `${Object.keys(error.fields)[0].split('.')[1]} 重复`,
          errorCode: 10002,
          request: `${ctx.method} ${ctx.path}`
        }
        console.log('am i here')
      }
    }
  }
}

module.exports = catchError
