const express   = require('express');
const route     = express.Router();
const controller = require('../controllers')

route.post('/login', controller.algo);

module.exports = route;