var dao = require('../../db/dao')

module.exports = {
  index: function *() {
    const ret = yield dao.gamelist.findAll({
      offset: isNaN(this.query.offset) ? 0 : +this.query.offset,
      limit : 20,
      order: [['time', 'desc']]
    })
    this.body = ret;
  }
}
