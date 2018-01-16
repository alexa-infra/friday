const path = require('path')

const dbPath = process.env.DB_PATH || path.join(__dirname, '..', 'sqlite.db')

module.exports = {
  database: {
    path: dbPath,
  }
}
