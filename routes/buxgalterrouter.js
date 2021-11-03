const express = require('express')
const router = express.Router()
const controller = require('../controllers/buxgaltercontroller');
const passport = require('passport');



router.post('/send', passport.authenticate('jwt', {session: false}), controller.create)

module.exports = router