// NOTE: Needed in order to avoid depending on the window object
require('cometd-nodejs-client').adapt();

const lib = require('cometd');
const cometd = new lib.CometD();

const config = require('./config.json');
const authLib = require('./lib/salesforceAuth.js');

main();

async function main() {
  const authToken = await authLib.authenticate(config);

  cometd.configure({
    url: `${config.myDomain}/cometd/54.0/`,
    requestHeaders: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  cometd.handshake(function (h) {
    if (h.successful) {
      // Subscribe to receive messages from the server.
      cometd.subscribe(config.platformEvent.topicChannel, function (message) {
        const dataFromServer = message.data;

        console.log('>>> Data: ');
        console.log(dataFromServer);
      });
    }
  });
}
