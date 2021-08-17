const express = require('express');
const router = express.Router();
const controller = require('../controllers/vashuristcontroller');


router.post('/sendl', controller.create);

module.exports = router;