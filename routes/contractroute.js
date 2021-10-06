const express = require('express');
const router = express.Router();
const controller = require('../controllers/contract.controller');
const passport = require('passport');

router.get('/', passport.authenticate('jwt', {session: false}), controller.getContracts);
router.patch('/patch/:id', passport.authenticate('jwt', {session: false}),  controller.update);
router.post('/create', passport.authenticate('jwt', {session: false}), controller.create);
router.get('/:id', passport.authenticate('jwt', {session: false}), controller.getById);


module.exports = router;