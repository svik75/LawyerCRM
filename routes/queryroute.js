const express = require('express');
const router = express.Router();
const controller = require('../controllers/querycontroller');
const passport = require('passport');

router.get('/',  passport.authenticate('jwt', {session: false}), controller.getAll);
router.get('/:user', passport.authenticate('jwt', {session: false}), controller.getByUser);
router.get('/:id', passport.authenticate('jwt', {session: false}), controller.getById);
router.delete('/:id', passport.authenticate('jwt', {session: false}),  controller.delete);
router.patch('/patch/:id', passport.authenticate('jwt', {session: false}),  controller.update);
router.post('/create', passport.authenticate('jwt', {session: false}), controller.create);

module.exports = router;