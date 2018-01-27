const makeApp = require('./app').makeApp
const config = require('./config')
const app = makeApp(config)

const port = process.env.PORT || 8000

app.listen(port, () => {
  console.log('Example app listening on port.. ' + port)
})
