const app = module.exports = require('express')();
const {SamlServiceProvider} = require( "../actions/access_token" );


const saml_options = {
    issuer : process.env.SAML_ISSUER,
    audiences : process.env.SAML_AUDIENCES,
    cert : process.env.SAML_CERT,
    key : process.env.SAML_KEY,
    tokenURI : process.env.SAML_TOKEN_URI,
    clientId : process.env.SAML_CLIENT_ID,
    clientPassword : process.env.SAML_CLIENT_PASSWORD,
}

app.post('/', (req, res) => {
    var samlServiceProvider = new SamlServiceProvider( saml_options );
    samlServiceProvider.getAccessToken(req.user.email, req.body.scope ).then((accessToken) => {
        res.json(accessToken);
    }).catch((error) => {
                res.status(500).json(error);
    });
})

app.get('*', (req,res) => {
    res.status('405').send({msg: 'method not supported, please use post'});
})