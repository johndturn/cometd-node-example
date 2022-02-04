const lib = require('cometd');
const cometd = new lib.CometD();

cometd.configure({
  url: '',
});

cometd.handshake(function (h) {
  if (h.successful) {
    // Subscribe to receive messages from the server.
    cometd.subscribe('/topic', function (m) {
      const dataFromServer = m.data;
      console.log(dataFromServer);
      // Use dataFromServer.
    });
  }
});
