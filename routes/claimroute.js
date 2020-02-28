const express = require('express')
const router = express.Router()
const controller = require('../controllers/claimcontroller')
const passport = require('passport')

router.get('/fl', /*passport.authenticate('jwt', {session: false}), */controller.getClaimFl)
router.get('/ul', /*passport.authenticate('jwt', {session: false}), */controller.getClaimUl)
router.patch('/patch/:id',  controller.update)
router.post('/create', controller.create)
// router.get('/:id', /*passport.authenticate('jwt', {session: false}), */controller.getById)


module.exports = router