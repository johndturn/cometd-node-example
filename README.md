# NodeJS CometD <> Salesforce Example

## Requirements

- Node & NPM
- OpenSSL

## Setup

1. Duplicate `./scripts/generate-certificate.sh.example` into `./scripts/generate-certificate.sh`
1. Fill in your correct information in `generate-certificate.sh`
1. Run `cd scripts/ && chmod +x generate-certificate.sh && cd ..`
1. Generate the certificate: `npm run create-cert`
1. Set up Connected App with the `.crt` that was generated via the shell script (see below screenshot)
1. Set up the `config.json` according to the `config.json.example` template and the information from your Connected App and SFDC instance
1. Install dependencies `npm i`
1. Run: `npm run start`

_Example Connected App Setup_

![Screen shot of Connected App Setup](./assets/connected-app-screenshot.png "Connected App")
