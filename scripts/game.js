let year = process.argv[2]
let month = +process.argv[3]

if (month < 10) {
  month = `0${month}`
} else {
  month = `${month}`
}

const link = `http://gf.tgbus.com/release/ps4_${year}${month}.shtml`

const superagent = require('superagent')
const cheerio = require('cheerio')
const fs = require('fs')

const dao = require('../db/dao.js')
const spawn = require('child_process').spawn

const reptile = {
  fetch (url) {
    return new Promise((resolve, reject) => {
      superagent
        .get(url)
        .end(function (err, res) {
          if (err || !res) {
            console.log(`err: at [${year}-${month}]`)
            console.log(err)
            reject(err)
          } else if (res.ok) {
            res.text
            resolve(res.text)
          }
        })
    })
  },
  isLoaded () {
    return new Promise((resolve, reject) => {
      dao
        .gamelist
        .findOne({
          where: {
            time: {
              $like: `${year}-${month}%`
            }
          }
        })
        .then(function (game) {
          if (game) {
            resolve(true)
          } else {
            resolve(false)
          }
        })
    })
  },
  formatGameInfo ($line) {
    function formatTime (t) {
      const nt = []
      t = '20' + t.replace(/年|月/img, '-').replace(/日/img, '')
      t.split('-').forEach(function(it) {
        if (+it < 10) {
          it = '0' + it
        }
        nt.push(it)
      })
      return nt.join('-');
    }

    return {
      name: String.prototype.trim.call($line.eq(2).find('a').text()),
      time: formatTime(String.prototype.trim.call($line.eq(0).text())),
      ver: String.prototype.trim.call($line.eq(1).text()),
      link: `http://gf.tgbus.com/${String.prototype.trim.call($line.eq(2).find('a').attr('href'))}`,
      cate: String.prototype.trim.call($line.eq(3).text()),
      com: String.prototype.trim.call($line.eq(4).text()) || 'unknow'
    }
  },
  creates (games) {
    return new Promise((resolve, reject) => {
      dao
        .gamelist
        .bulkCreate(games)
        .then(function () {
          spawn(`node`, ['--harmony-async-await', 'scripts/fixcom.js'], {
            stdio: 'inherit'
          })
          resolve()
        })
    })
  },
  getGames: async (url) => {
    const isLoaded = await reptile.isLoaded()

    if (isLoaded) {
      console.log(`[${year}-${month}] is loaded!`)
      return
    }

    const gamesPage = await reptile.fetch(url)
    const $ = cheerio.load(gamesPage)

    // list
    const games = []
    $('.item table tbody tr')
      .each((i, item) => {
        const $line = $(item).find('td')
        games.push(reptile.formatGameInfo($line))
      })
    console.log(`Total: ${games.length}`)

    // cover
    for (var i = 0, len = games.length; i < len; i++) {
      const gameDetailPage = await reptile.fetch(games[i].link)
      const $$ = cheerio.load(gameDetailPage)
      games[i].cover = $$('#versonimg').attr('src')
      console.log(`[${i + 1}/${games.length}]`)
    }

    await reptile.creates(games)
    console.log(`[${year}-${month}] db write success!`)
  }
}

reptile.getGames(link)
