const spawn = require('child_process').spawn

const startTime = new Date('2013-11-01')
const nowTime = new Date()

function nextMonth (time) {
  let year = time.getFullYear()
  let month = time.getMonth() + 1

  if (month >= 12) {
    year++
    month = 1
  } else {
    month++
  }

  return new Date(`${year}-${month}-1`)
}

let currTime = startTime
do {
  const year = currTime.getFullYear()
  const month = currTime.getMonth() + 1
  console.log(`fetch ${year}-${month}`)
  spawn(`node`, ['--harmony-async-await', 'scripts/game.js', year, month], {
    stdio: 'inherit'
  })

  currTime = nextMonth(currTime)
} while(!(currTime.getFullYear() >= nowTime.getFullYear() && currTime.getMonth() > nowTime.getMonth()))
