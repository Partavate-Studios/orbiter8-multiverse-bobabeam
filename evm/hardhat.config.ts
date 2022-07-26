import "@nomiclabs/hardhat-ethers";
import "@nomiclabs/hardhat-etherscan";
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from "dotenv";

import("./tasks/verify-published")
import("./tasks/mint")
import("./tasks/register-foreign")

dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.9",
  networks: {
    hardhat: {
      chainId: 31337
    },
    localhost: {
      chainId: 1337
    },
    ganache: {
      chainId: 1337,
      url: process.env.GANACHE_RPC_URI,
      accounts:
        process.env.GANACHE_PRIVATE_KEY !== undefined ? [process.env.GANACHE_PRIVATE_KEY] : [],
    },
    rinkeby: {
      chainId: 4,
      url: process.env.RINKEBY_GETH_URI,
      accounts:
        process.env.RINKEBY_GETH_PRIVATE_KEY !== undefined ? [process.env.RINKEBY_GETH_PRIVATE_KEY] : [],
    },
    bobabase: {
      chainId: 1297,
      url: process.env.BOBABASE_RPC_URI,
      accounts:
        process.env.BOBABASE_PRIVATE_KEY !== undefined ? [process.env.BOBABASE_PRIVATE_KEY] : [],
    },
    moonbase: {
      chainId: 1287,
      url: process.env.MOONBASEALPHA_RPC_URI,
      accounts:
        process.env.MOONBASEALPHA_PRIVATE_KEY !== undefined ? [process.env.MOONBASEALPHA_PRIVATE_KEY] : [],
    }
  },
  gasReporter: {
    enabled: (process.env.REPORT_GAS) ? true : false,
    currency: "USD",
    //gasPrice: 44, // 2022.02.24 - Ethereum mainnet
    gasPriceApi: 'Binance',
    token: 'BNB',
    coinmarketcap: process.env.COINMARKETCAP_API_KEY, // API Key
  },
  etherscan: {
    apiKey: {
      rinkeby: process.env.ETHERSCAN_API_KEY ?? "",
      moonbase: process.env.MOONBEAM_API_KEY ?? "",
      // Uses Blockscout, not etherscan. No accounts, but takes any string!
      bobabase: process.env.BOBASCAN_API_KEY ?? "",
    },
    customChains: [
      {
        network: "bobabase",
        chainId: 1297,
        urls: {
          apiURL: "https://blockexplorer.bobabase.boba.network/api",
          browserURL: "https://blockexplorer.bobabase.boba.network"
        }
      },
      {
        network: "moonbase",
        chainId: 1287,
        urls: {
          apiURL: "https://api-moonbase.moonscan.io/api",
          browserURL: "https://moonbase.moonscan.io/"
        }
      },
    ]
  }
};

export default config;
