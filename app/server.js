const Express = require('express');
const jwt = require('express-jwt');
const logger = require('debug')('express');
const jwksRsa = require('jwks-rsa');
const routes = require('./routes');
const bodyParser = require('body-parser');

// const saml = require('modules/saml.js')

const jwksHost = process.env.JWKS_HOST;
const audience = process.env.AUDIENCE;
const issuer = process.env.ISSUER;

// Initialize the app.
const app = new Express();

app.use(bodyParser.urlencoded({ extended: false }))

app.use(jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 2,
    jwksUri: `${jwksHost}`
  }),
  audience: audience,
  issuer: issuer,
  algorithms: [ 'RS256' ]
}));

app.use(routes);

app.use((err, req, res, next) => {
  logger(err.name, err.message);
  res.json({
    name: err.name,
    message: err.message
  });
});

// Start the server.
const port = process.env.PORT || 4001;
app.listen(port, function(error) {
  if (error) {
    logger(error);
  } else {
    logger('Listening on http://localhost:' + port);
  }
});