const db = require('../db')
const Promise = require('bluebird')
const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

const getConn = (req) => {
  const app = req.app
  const config = app.locals.config
  const { path } = config.database
  return db.openDb(path)
}

const checkExists404 = (data) => {
  if (!data) {
    throw {code: 404}
  }
  return data
}

const handleError = (res, err) => {
  const code = parseInt(err.code) || 500
  res.status(code)
  res.json({error: code})
  if (code >= 500)
    console.log(err.stack)
}

router.use(bodyParser.json())

router.get('/', function (req, res) {
  Promise.using(getConn(req), (conn) => {
    const page = parseInt(req.query.page, 10) || 0
    const pageSize = parseInt(req.query.pageSize, 10) || 10
    if (pageSize <= 0) {
      return handleError(res, {code: 400})
    }
    return db.links.getPage(conn, page, pageSize).then(({rows, count}) => {
      res.json({
        page: page,
        pageSize: pageSize,
        rows: rows,
        count: count,
      })
    })
  })
  .catch(err => handleError(res, err))
})

router.get('/all/', function (req, res) {
  Promise.using(getConn(req), (conn) => {
    const lastId = req.query.lastId || null
    const pageSize = parseInt(req.query.pageSize, 10) || 10
    if (pageSize <= 0) {
      return handleError(res, {code: 400})
    }
    return db.links.getPage2(conn, lastId, pageSize).then((rows) => {
      let lastId = null
      if (rows && rows.length) {
        lastId = rows[rows.length - 1].last_access
      }
      res.json({
        rows: rows,
        lastId: lastId,
      })
    })
  })
  .catch(err => handleError(res, err))
})

router.post('/', function (req, res) {
  Promise.using(getConn(req), (conn) => {
    if (!req.is('json')) {
      return handleError(res, {code: 406})
    }
    const { title, url } = req.body
    if (!title || !url) {
      return handleError(res, {code: 400})
    }
    return db.links.insert(conn, {title, url})
      .then(data => db.links.get(conn, data.lastID))
      .then(data => res.status(201).json(data))
  })
  .catch(err => handleError(res, err))
})

router.get('/add', function (req, res) {
  Promise.using(getConn(req), (conn) => {
    const { title, url } = req.query
    if (!title || !url) {
      return handleError(res, {code: 400})
    }
    return db.links.insert(conn, {title, url})
      .then(data => db.links.get(conn, data.lastID))
      .then(data => res.redirect('/'))
  })
  .catch(err => handleError(res, err))
})

router.get('/:id', function (req, res) {
  Promise.using(getConn(req), (conn) => {
    const id = req.params.id
    return db.links.get(conn, req.params.id)
      .then(data => checkExists404(data))
      .then(data => res.json(data))
  })
  .catch(err => handleError(res, err))
})

router.put('/:id', function (req, res) {
  Promise.using(getConn(req), (conn) => {
    const id = req.params.id
    if (!req.is('json')) {
      return handleError(res, {code: 406})
    }
    let { title, url } = req.body
    if (!title && !url) {
      return handleError(res, {code: 400})
    }
    return db.links.get(conn, id)
      .then(data => checkExists404(data))
      .then(data => {
        title = title || data.title
        url = url || data.url
        return db.links.update(conn, id, {title, url})
      })
      .then(data => db.links.get(conn, id))
      .then(data => res.json(data))
  })
  .catch(err => handleError(res, err))
})

router.delete('/:id', function (req, res) {
  Promise.using(getConn(req), (conn) => {
    const id = req.params.id
    return db.links.get(conn, id)
      .then(data => checkExists404(data))
      .then(data => db.links.delete(conn, id))
      .then(data => db.links.get(conn, id))
      .then(data => res.status(204).end())
  })
  .catch(err => handleError(res, err))
})

router.get('/:id/redirect', function (req, res) {
  Promise.using(getConn(req), (conn) => {
    const id = req.params.id
    return db.links.get(conn, id)
      .then(data => checkExists404(data))
      .then(data => db.links.update_usage(conn, id))
      .then(data => db.links.get(conn, id))
      .then(data => res.redirect(data.url))
  })
  .catch(err => handleError(res, err))
})

router.use((err, req, res, next) => {
  handleError(res, {code: err.status || 500, stack: err.stack})
})

module.exports = router
