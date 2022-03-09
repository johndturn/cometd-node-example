# NodeJS CometD <> Salesforce Example

> Built with ❤️ &nbsp;by John Turner

Small POC of subscribing to Salesforce Platform Events via the NodeJS CometD library.

Utilizes the [OAuth 2.0 JWT Bearer flow](https://help.salesforce.com/s/articleView?id=sf.remoteaccess_oauth_jwt_flow.htm&type=5) for authenticating to Salesforce.

## Requirements

- Node 16+ & NPM
- OpenSSL
- Access to a Salesforce Org with a Platform Event created

## Setup

**Note**: The following (at this time) has been tested on a macOS machine. I can't vouch for the Certificate Generation section working on Linux or Windows environments running WSL.

### Certificate Generation

1. Clone this repo to your local machine
1. Duplicate `./scripts/generate-certificate.sh.example` into `./scripts/generate-certificate.sh`
1. Fill in your correct information in `generate-certificate.sh`
1. Run `cd scripts/ && chmod +x generate-certificate.sh && cd ..`
1. Generate the certificate: `npm run create-cert`

### Connected App Setup

_Example Connected App Setup_

![Screen shot of Connected App Setup](./assets/connected-app-screenshot.png 'Connected App')

1. Set up Connected App with the `.crt` that was generated via the shell script
1. Navigate to Setup > Manage Connected Apps > Your newly-created App
1. Edit the app and switch the App's "Permitted Users" option to `Admin approved users are pre-authorized`
1. Create a new Permission Set that allows access to this Connected App
1. Assign your user to the Permission Set

### Local Config Setup

1. Duplicate `config.json.example` into `config.json`
1. Set up the `config.json` according to the information from your Connected App and SFDC instance
1. Install dependencies `npm i`
1. Run: `npm run start`
