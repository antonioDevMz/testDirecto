const express   =   require("express");
const app       =   express();
const http      =   require('http');
const server    =   http.createServer(app);
const bodyPars  =   require('body-parser');
const env       =   require('./environment');
const routes    =   require('./routes');

//SERVER
app.use(bodyPars.urlencoded({ extended: false }));
app.use(bodyPars.json());
app.use('/bambu', routes);

app.set('port', env.deploy.port);
let port = app.get('port');
server.listen(port, () => {
    console.log(`server start on port ${env.deploy.port}`);
});
