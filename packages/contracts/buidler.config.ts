import { BuidlerConfig, usePlugin } from "@nomiclabs/buidler/config";

usePlugin("@nomiclabs/buidler-waffle");
usePlugin("@nomiclabs/buidler-ethers");
usePlugin("buidler-typechain");
// usePlugin("buidler-gas-reporter");
// usePlugin("@nomiclabs/buidler-solpp");

const config: BuidlerConfig = {
  defaultNetwork: "buidlerevm",
  networks: {
    locale: {
      url: " http://127.0.0.1:8545/"
    },
    buidlerevm: {
      gas: "auto",
      blockGasLimit: 5000000000,
      loggingEnabled: true
    },
    rinkeby: {
      url: "https://rinkeby.infura.io/v3/499c90502ea347c3971243e0e0f7172e",
      accounts: {
        mnemonic:
          "gas blush witness leopard voyage regret napkin mail onion pitch gather soon"
      }
    }
  },
  solc: {
    version: "0.5.5",
    optimizer: {
      enabled: true,
      runs: 200
    }
  },
  typechain: {
    outDir: "../web/src/contracts/",
    target: "ethers"
  },
  gasReporter: {
    currency: "NOK",
    gasPrice: 5
  }
  // solpp: {
  //   cwd: "contracts",
  //   tolerant: true
  // }
};

export default config;
