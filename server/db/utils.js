const moment = require('moment')

const utcnow = () => {
  return moment.utc().format('YYYY-MM-DD HH:mm:ss.SSSSS')
}

exports.utcnow = utcnow
