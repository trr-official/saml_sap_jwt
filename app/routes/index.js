const app = module.exports = require('express')();

app.get('/', (req,res) => {
     res.send( {msg: 'Hello World, server is up and running'} );
});

app.use('/access_token', require('./access_token.js' ));

app.get('*', (req,res) => {
    res.status(404).send( {msg: 'not found'} );
});