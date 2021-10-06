const express = require('express')
const router = express.Router()
const controller = require('../controllers/claimcontroller')
const passport = require('passport')

router.get('/fl', passport.authenticate('jwt', {session: false}), controller.getClaimFl)
router.get('/ul', passport.authenticate('jwt', {session: false}), controller.getClaimUl)
router.patch('/patch/:id', passport.authenticate('jwt', {session: false}),  controller.update)
router.post('/create', passport.authenticate('jwt', {session: false}), controller.create)
// router.get('/:id', /*passport.authenticate('jwt', {session: false}), */controller.getById)


module.exports = router