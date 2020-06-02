class HttpException extends Error {
  constructor(msg = '服务器异常', errorCode = 99999, status = 500) {
    super()
    this.errorCode = errorCode
    this.status = status
    this.msg = msg
  }
}

class ParameterException extends HttpException {
  constructor(msg = '参数错误', errorCode = 10000) {
    super()
    this.status = 400
    this.msg = msg
    this.errorCode = errorCode
  }
}

class Success extends HttpException {
  constructor(msg = '成功', errorCode = 200001) {
    super()
    this.status = 201
    this.msg = msg
    this.errorCode = errorCode
  }
}

class NotFound extends HttpException {
  constructor(msg = '资源未找到', errorCode = 10004) {
    super()
    this.status = 404
    this.msg = msg
    this.errorCode = errorCode
  }
}

class AuthFailed extends HttpException {
  constructor(msg = '授权失败', errorCode = 10001) {
    super()
    this.msg = msg
    this.errorCode = errorCode
    this.status = 401
  }
}

class Forbidden extends HttpException {
  constructor(msg = '禁止访问', errorCode = 10003) {
    super()
    this.msg = msg
    this.errorCode = errorCode
    this.status = 403
  }
}

module.exports = {
  HttpException,
  ParameterException,
  Success,
  NotFound,
  AuthFailed,
  Forbidden
}
