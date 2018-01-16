const express = require('express')
const path = require('path')
const api = require('./api')

const makeApp = (config) => {
  const app = express()

  app.locals.config = config

  if (app.get('env') === 'development') {
    app.locals.pretty = true
    app.set('json spaces', 2)
  }

  app.use('/api', api)
  return app
}

module.exports.makeApp = makeApp
