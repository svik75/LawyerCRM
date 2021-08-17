const express = require('express')
const router = express.Router()
const controller = require('../controllers/buxgaltercontroller')


router.post('/send', controller.create)

module.exports = router