// fix company
const dao = require('../db/dao.js')

const fixer = {
  getUnkownCom: function () {
    return new Promise((resolve, reject) => {
      dao.gamelist
        .findAll({
          where: {
            com: 'unknow'
          }
        })
        .then(function (games) {
          resolve(games)
        })
    })
  },

  findRightGame: function (name) {
    return new Promise((resolve, reject) => {
      dao.gamelist
        .findOne({
          where: {
            name: name,
            $not: [
              {
                com: 'unknow'
              }
            ]
          }
        })
        .then(function (game) {
          resolve(game)
        })
    })
  },

  updateGame: function (id, data) {
    return new Promise((resolve, reject) => {
      dao.gamelist
        .update(data, {
          where: {
            id: id
          }
        })
        .then(function () {
          resolve()
        })
    })
  },

  start: async function () {
    const games = await fixer.getUnkownCom()

    for (let i = 0; i < games.length; i++) {
      const game = games[i]
      const rightGame = await fixer.findRightGame(game.name)
      if (rightGame) {
        console.log(rightGame)
        await fixer.updateGame(game.id, {
          com: rightGame.com
        })
        console.log(`${game.name} fixed`)
      }
    }
  }
}

fixer.start()
