const Squelize = require('sequelize')

const sequelize = new Squelize('book', 'root', '123456', {
  dialect: 'mysql',
  host: 'localhost',
  port: 3306,
  logging: true,
  timezone: '+08:00',
  define: {
    timestamps: true,
    paranoid: true
  }
})

module.exports = {
  sequelize
}
