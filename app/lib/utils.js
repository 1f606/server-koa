const jwt = require('jsonwebtoken')

const generateToken = function (uid, scope) {
  return jwt.sign({
    uid,
    scope
  }, global.customConfig.PRIVATE_KEY, {
    expiresIn: global.customConfig.EXPIRE
  })
}

module.exports = {
  generateToken
}
