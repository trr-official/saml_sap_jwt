# Introduction 
    Generates a access token from a SAML SP

# Getting Started
TODO: Guide users through getting your code up and running on their own system. In this section you can talk about:
1.	Installation process

Run
```
    npm install
    npm start
```
2.	Environment Variables 
```
JWKS_HOST="https://login.microsoftonline.com/common/discovery/keys"
AUDIENCE="<client id of azure app registration>"
ISSUER="https://login.microsoftonline.com/<tenant id>/v2.0"

SAML_AUDIENCES = "https://<sap host>/sap/bc/sec/oauth2/token"
SAML_ISSUER = "http://localhost:3000/"
SAML_CERT =  "../../keys/private.pem"
SAML_KEY = "../../keys/public.key"
SAML_TOKEN_URI = "https://<sap host>/sap/bc/sec/oauth2/token"
SAML_CLIENT_ID = "<Client ID>"
SAML_CLIENT_PASSWORD = "<Client user password>"

NODE_TLS_REJECT_UNAUTHORIZED = 0
```
3.  Generate Keys
Generate the private key, I use openssl
```
openssl genrsa -out private.pem 2048
```
Extract the public key
```
openssl rsa -in key.pem -outform PEM -pubout -out public.key
```
Copy the keys into */keys*

4.	API references
```
post <server>/access_token
