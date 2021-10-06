const express = require('express');
const controller = require('../controllers/authcontroller');
const router = express.Router();
const passport = require('passport');

router.post('/login', controller.login);
router.post('/register', controller.register);
router.delete('/:email', passport.authenticate('jwt', {session: false}), controller.delete);
router.get('/', passport.authenticate('jwt', {session: false}), controller.getAll);
router.get('/:email', passport.authenticate('jwt', {session: false}), controller.getByEmail);
router.patch('/patch', passport.authenticate('jwt', {session: false}), controller.update);
router.patch('/patchadmin', passport.authenticate('jwt', {session: false}), controller.updateAdmin);

module.exports = router;