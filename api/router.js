var games = require('./fn/games');

module.exports = {
  get: {
    '/api/games': games.index
  }
}
