const util = require('util')
const axios = require('axios')
const { User } = require('../models/user')
const { Auth } = require('../middlewares/auth')
const { generateToken } = require('../lib/utils')

class WXManager {
  static async codeToToken(code) {
    const url = util.format(global.customConfig.wx.loginUrl).replace('JSCODE', code)
    const result = await axios.get(url)
    if (result.status !== 200) {
      throw new global.errs.AuthFailed('openid获取失败')
    }
    if (result.data.errcode && result.data.errcode !== 0) {
      throw new global.errs.AuthFailed('openid获取失败' + result.data.errcode)
    }
    let user = await User.getUserByOpenid(result.data.openid)
    if (!user) {
      user = User.registerByOpenid(result.data.openid)
    }
    return generateToken(user.id, Auth.USER)
  }
}

module.exports = {
  WXManager
}
