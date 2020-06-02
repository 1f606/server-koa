const bcrypt = require('bcryptjs')
const { sequelize } = require('../core/db')
const { Model, DataTypes } = require('sequelize')

class User extends Model {
  static async verifyEmailPassword(email, pwd) {
    const user = await User.findOne({
      where: {
        email
      }
    })
    if (!user) {
      throw new global.errs.AuthFailed('用户不存在')
    }
    const correct = bcrypt.compareSync(pwd, user.password)
    if (!correct) {
      throw new global.errs.AuthFailed('密码不正确')
    }
    return user
  }

  static async getUserByOpenid(openid) {
    const user = await User.findOne({
      where: {
        openid
      }
    })
    return user
  }

  static async registerByOpenid(openid) {
    return await User.create({
      openid
    })
  }
}

User.init({
  //  主键：不能重复，不能为空
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nickname: DataTypes.STRING,
  email: {
    type: DataTypes.STRING(128),
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    set (val) {
      const salt = bcrypt.genSaltSync(10)
      const pwd = bcrypt.hashSync(val, salt)
      this.setDataValue('password', pwd)
    }
  },
  openid: {
    //  限制长度最大64字符
    type: DataTypes.STRING(64),
    unique: true
  },
}, {
  sequelize,
  tableName: 'user'
})

module.exports = { User }
