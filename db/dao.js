var config = require('./config.js')
var gamelistModel = require('./models/gamelist.js')

const Sequelize = require('sequelize')
const sequelize = new Sequelize(config.database, config.user, config.password, {
  host: config.host,
  dialect: 'mysql',
})

module.exports = {
  gamelist: gamelistModel(sequelize, Sequelize)
}
