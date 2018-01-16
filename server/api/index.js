const express = require('express')
const router = express.Router()
const links = require('./links')

router.use('/links', links)

module.exports = router
