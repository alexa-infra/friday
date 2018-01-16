const Promise = require('bluebird')
const sqlite3 = require('sqlite3').verbose()

const promisify_sqlite = (db) => {
  db.get = Promise.promisify(db.get)
  db.all = Promise.promisify(db.all)
  db.exec = Promise.promisify(db.exec)
  //db.run = Promise.promisify(db.run)
  let db_run = db.run
  db_run = db_run.bind(db)
  db.run = (sql, params) => {
    return new Promise((resolve, reject) => {
      db_run(sql, params, function(err){
        if (err) {
          reject(err)
        } else {
          resolve({ lastID: this.lastID, changes: this.changes })
        }
      })
    })
  }
  //db.on('trace', (txt) => {
  //  console.log(txt)
  //})
}

const openDb = (dbPath) => {
  return new Promise((resolve) => {
    const db = new sqlite3.Database(dbPath)
    promisify_sqlite(db)
    resolve(db)
  }).disposer((db, promise) => {
    if (db) db.close()
  })
}

exports.openDb = openDb
exports.links = require('./links')
