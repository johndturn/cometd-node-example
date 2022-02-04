#!/bin/bash

CERT_DIRECTORY="cert"

# Set up the directory if it doesn't exist
# NOTE: Assumes that you're running this script from the project root
[ ! -d "/$CERT_DIRECTORY" ] && mkdir $CERT_DIRECTORY

# Generate RSA Private Key
openssl genpkey -algorithm RSA -pkeyopt rsa_keygen_bits:2048 -out $CERT_DIRECTORY/private-key.pem

# Generate Certificate Request
# NOTE: Put in your info below
openssl req -new -key $CERT_DIRECTORY/private-key.pem -out $CERT_DIRECTORY/cert-request.csr \
-subj "/C=TWO_DIGIT_COUNTRY/ST=STATE/L=CITY/CN=REVERSE_DOMAIN/emailAddress=EMAIL_ADDRESS"

# Generate SSL Cert
openssl x509 -req -sha256 -days 365 -in $CERT_DIRECTORY/cert-request.csr -signkey $CERT_DIRECTORY/private-key.pem -out $CERT_DIRECTORY/certificate.crt
