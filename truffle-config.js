const path = require("path");

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "app/src/contracts"),
  rinkeby: {
    host: "localhost", // Connect to geth on the specified
    port: 8545,
    from: "0xE4D6d394c624d1772717fF40A79474f6A725CB4d", // default address to use for any transaction Truffle makes during migrations
    network_id: 4,
    gas: 4612388 // Gas limit used for deploys
  }
};
