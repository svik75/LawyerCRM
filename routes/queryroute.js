const express = require('express')
const router = express.Router()
const controller = require('../controllers/querycontroller')
const passport = require('passport')

router.get('/',  controller.getAll)
router.get('/:user', /*passport.authenticate('jwt', {session: false}), */controller.getByUser)
router.get('/:id', /*passport.authenticate('jwt', {session: false}), */controller.getById)
router.delete('/:id',  controller.delete)
router.patch('/patch/:id',  controller.update)
router.post('/create', controller.create)

module.exports = router