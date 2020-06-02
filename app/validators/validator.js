const validator = require('validator')
const { LoginType } = require('../lib/enum')
const { User } = require('../models/user')
const { ParameterException } = require('../core/HttpException')

class regValidator {
  static validate(body) {
    this.validateName(body.nickname)
    this.validatePassword(body.password1, body.password2)
    return this.validateEmail(body.email)
  }

  static validateName(nickname) {
    const nameResult = validator.isLength(nickname, {
      min: 6,
      max: 32
    })
    if (!nameResult) {
      throw new ParameterException('nickname长度不符合')
    }
  }

  static validatePassword(pwd1, pwd2) {
    const pwdResult = validator.isLength(pwd1, {
      min: 6,
      max: 32
    })
    if (!pwdResult) {
      throw new ParameterException('密码长度不符合')
    }
    if (pwd1 !== pwd2) {
      throw new ParameterException('密码不一致')
    }
  }

  static validateEmail(email) {
    const emailResult = validator.isLength(email, {
      min: 6,
      max: 128
    })
    if (!emailResult) {
      throw new ParameterException('邮箱长度不符合')
    }
    return User.findOne({
      where: {
        email: email
      }
    })
  }
}

function TokenValidator (body) {
  if (!body.email) {
    if (!body.type) {
      throw new ParameterException('email和type不能为空')
    } else {
      throw new ParameterException('email不能为空')
    }
  } else {
    if (!body.type) {
      throw new ParameterException('type不能为空')
    }
  }
  const emailResult = validator.isLength(body.email, {
    min: 4,
    max: 32
  })
  if (!emailResult) {
    throw new ParameterException('账号长度不符合')
  }
  if (!LoginType.isThisType(body.type)) {
    throw new ParameterException('type参数不符合规范')
  }
  if (body.type !== 100) {
    const pwdResult = validator.isLength(body.password, {
      min: 6,
      max: 128
    })
    if (!pwdResult) {
      throw new ParameterException('密码长度不符合')
    }
  }
}

class NotEmptyValidator {
  constructor(token) {
    const _token = validator.isLength(token, {
      min: 1
    })
    if (!_token) {
      throw new Error('token不允许为空')
    }
  }
}


module.exports = { regValidator, TokenValidator, NotEmptyValidator }
