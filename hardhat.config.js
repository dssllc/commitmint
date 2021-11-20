require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require("hardhat-gas-reporter");

// Env vars
const alchemyRinkebyEndpoint = process.env.ALCHEMY_ENDPOINT_RINKEBY || "https://eth-rinkeby.alchemyapi.io/v2/67890";
const privateKey = process.env.PRIVATE_KEY || "0000000000000000000000000000000000000000";
const etherScanAPIKey = process.env.ETHERSCAN_API_KEY || "";
const cmcAPIKey = process.env.CMC_API_KEY || "";

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.10",
  paths: {
    artifacts: './src/artifacts',
  },
  networks: {
    hardhat: {
      chainId: 1337
    },
    rinkeby: {
      url: alchemyRinkebyEndpoint,
      accounts: [`0x${privateKey}`]
    },
    gasReporter: {
      url: "http://localhost:8545"
    }
  },
  gasReporter: {
    currency: "USD",
    enabled: true,
    showTimeSpent: true,
    coinmarketcap: cmcAPIKey
  },
  etherscan: {
    apiKey: etherScanAPIKey
  }
};
