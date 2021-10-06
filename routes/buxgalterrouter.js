const express = require('express')
const router = express.Router()
const controller = require('../controllers/buxgaltercontroller')


router.post('/send', passport.authenticate('jwt', {session: false}), controller.create)

module.exports = router