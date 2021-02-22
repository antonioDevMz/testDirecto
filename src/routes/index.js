const express   = require('express');
const route     = express.Router();
const ctrl      = require('../controllers')

route.post('/test', ctrl.test);

module.exports = route;