# Introduction 

Generates a access token from a SAML SP

# Getting Started

## Installation process

Run

```
    npm install
    npm start
```

## Environment Variables 

Create a .env file in the project root folder and add the following content that you've adjusted to your needs:

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

## Generate Keys

Generate the private key, I use openssl

```
openssl genrsa -out private.pem 2048
```

Extract the public key

```
openssl rsa -in private.pem -outform PEM -pubout -out public.key
```

Copy the keys into */keys*

## API references

```
post <server>/access_token
```