const fs = require('fs');
const jwt = require('jsonwebtoken');
require('isomorphic-fetch');

/**
 * Authenticates to SFDC based on OAuth 2.0 JWT Bearer Flow
 * @param {Object} config
 * @param {String} config.consumerKey
 * @param {String} config.salesforceAuthServer
 * @param {String} config.salesforceUsername
 */
async function authenticate(config) {
  const keyData = fs.readFileSync(require.resolve('../cert/private-key.pem')).toString();

  const jwtClaims = {
    iss: config.consumerKey,
    aud: config.salesforceAuthServer,
    sub: config.salesforceUsername,
    exp: addMinutesToDate(new Date(), 2),
  };

  const jwtOptions = {
    algorithm: 'RS256',
  };

  const token = jwt.sign(jwtClaims, keyData, jwtOptions);

  const url = prepareAuthUrl(token, config.salesforceAuthServer);

  const response = await fetch(url, {
    method: 'post',
  });

  const body = await response.json();
  const accessToken = body.access_token;
  return accessToken;
}

function addMinutesToDate(date, minutes) {
  return new Date(date.getTime() + minutes * 60000).getTime();
}

function prepareAuthUrl(token, authServer) {
  const url = new URL(`${authServer}/services/oauth2/token`);

  const urlParams = {
    grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
    assertion: token,
  };

  url.search = new URLSearchParams(urlParams).toString();

  return url;
}

module.exports = {
  authenticate,
};
