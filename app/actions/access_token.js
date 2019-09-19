const saml2 = require('saml').Saml20;
const fs = require('fs');
const requestPromise = require('request-promise-native');
const uuidv1 = require('uuidv1');


class SamlServiceProvider
{
    constructor( samlOptions )
    {
        this.samlOptions = samlOptions;
    }

    getSamlAssertion(email) {
        const options = {
            cert: fs.readFileSync(__dirname + '/' + this.samlOptions.cert ) ,
            key: fs.readFileSync(__dirname + '/' + this.samlOptions.key) ,
            issuer: this.samlOptions.issuer,
            lifetimeInSeconds: 600,
            audiences: this.samlOptions.audiences,
          
            nameIdentifier: email,
            nameIdentifierFormat: 'urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress',
          
            sessionIndex: uuidv1()
          };
        
        var samlAssertion = saml2.create(options);

        return samlAssertion;
    }

    async getAccessToken(email, scope) {

        const signedSamlAssertion = this.getSamlAssertion( email );

        const options = {
            method: 'POST',
            auth: {
                username: this.samlOptions.clientId,
                password: this.samlOptions.clientPassword
            },
            headers :{
                "Content-Type": "multipart/form-data"
            },
            uri: this.samlOptions.tokenURI,
            formData: {
                assertion : Buffer.from(signedSamlAssertion).toString('base64'),
                grant_type : "urn:ietf:params:oauth:grant-type:saml2-bearer",
                client_id : this.samlOptions.clientId,
                scope: scope 
            }
         
        };
         

        var body = await requestPromise.post( options );
        return body;
        
    }
}

module.exports = {
    SamlServiceProvider
};