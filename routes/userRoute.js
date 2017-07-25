const express = require('express')
var router = express.Router()
const userController = require('../controllers/userController')

router.get('/new', function (req, res) {
  res.render('user/register')
})

router.post('/new', userController.register)

module.exports = router
