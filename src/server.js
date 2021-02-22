const express   = require("express");
const app       = express();
const http      = require('http');
const server    = http.createServer(app);
const bodyPars  = require('body-parser');
const routes    = require('./routes');
const { deploy: { port } } = require('./environment');

//SERVER
app.use(bodyPars.urlencoded({ extended: false }));
app.use(bodyPars.json());
app.use('/directo', routes);
app.set('port', port);

server.listen(port, () => {
    console.log(`server start on port ${port}`);
});