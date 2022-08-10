// Simple NFT Bridging using Boba + Moonbeam
// Written for the game Orbiter 8, by Partavate Studios

// Usage: `npx ts-node scripts/bridge.ts --destination={bobabase|moonbase} --ship=shipId`
// Partavate Owner: Use Ship id 1287 for boba->moonbase, 1297 for moonbase->boba (same as source chain id)

// NOTE: Do run run via `npx hardhat run`, use `npx ts-node` directly (Hardhat scripts can't have arguments)
// The SOURCE network is set by the network named in the first argument. (NOT using `--network`)

// NOTE: This handles "Native" NFTs on their source chain (L1 or L2)
// There is a subsequent step required on the destination chain (to exit the minted NFT there)

// Docs: https://docs.boba.network/other/bridges

// NFTBridge Sources: 
// - https://github.com/bobanetwork/boba_base/blob/main/packages/boba/contracts/contracts/bridges/L1NFTBridge.sol
// - https://github.com/bobanetwork/boba_base/blob/main/packages/boba/contracts/contracts/bridges/L2NFTBridge.sol

// Utility Imports
const { Contract, providers, Wallet, ethers, utils } = require('ethers')
const { getContractFactory } = require('@eth-optimism/contracts')
require('dotenv').config()
const yargs = require('yargs/yargs')
const { hideBin } = require('yargs/helpers')

// Boba Imports (Compiled in cloned BobaNetwork/boba repo, ABIs generated with hardhat-abi-exporter)
// NOTE: These don't have a .abi sub-object, use them directly
const L1NFTBridgeJson = require('../artifacts/contracts/vendor/boba/L1NFTBridge.json')
const L2NFTBridgeJson = require('../artifacts/contracts/vendor/boba/L2NFTBridge.json')
const BOBABillingContractJson = require('../artifacts/contracts/vendor/boba/L2BillingContract.json')
const L2GovernanceERC20Json = require('../artifacts/contracts/vendor/boba/L2GovernanceERC20.json')

// Partavate Studios Contracts (ABI is <name>.abi)
const MoonbaseShipERC721Json = require('../artifacts/contracts/MultiverseShip.L1.sol/MultiverseShip_L1.json')
const BobabaseShipERC721Json = require('../artifacts/contracts/MultiverseShip.L2.sol/MultiverseShip_L2.json')

// Partavate Studios Utilities
import { getDeployment } from "../lib/logDeployment"


class Config {
  public env: NodeJS.ProcessEnv = process.env
  public chainIds = {
    'moonbase': 1287,
    'bobabase': 1297,
  }
  public RPC_URIS: {[key: number]: string} = {
    1287: this.env.MOONBASEALPHA_RPC_URI ?? 'UNSET URI',
    1297: this.env.BOBABASE_RPC_URI ?? 'UNSET URI',
  }
  public PRIV_KEYS: {[key: number]: string} = {
    1287: this.env.MOONBASEALPHA_PRIVATE_KEY ?? 'UNSET PRIV_KEY',
    1297: this.env.BOBABASE_PRIVATE_KEY ?? 'UNSET PRIV_KEY',
  }

  // From ../addresses/published-addresses.json (@TODO use `getDeployment()`)
  public MoonbaseShipContractAddress = getDeployment(this.chainIds['moonbase'])
  public BobabaseShipContractAddress = getDeployment(this.chainIds['bobabase'])

  // From https://github.com/bobanetwork/boba/blob/develop/packages/boba/register/addresses/addressesBobaBase_0xF8d0bF3a1411AC973A606f90B2d1ee0840e5979B.json
  // TODO: Boba has an AddressManager contract, but without an ABI, we can't use it...
  public ADDRESS_MANAGER_ADDRESS = '0x93A96D6A5beb1F661cf052722A1424CDDA3e9418'
  public L1NFTBridgeAddress = '0x1E12Ba552Ac35351563091737910d9E5d1DaD17a' // Proxy__L1NFTBridge
  public L2NFTBridgeAddress = '0x8E65834B52c3aCc79206a0F09c4b627BC588f09e' // Proxy__L2NFTBridge

  public BOBABillingContractAddress = '0x05C9f36D901594D220311B211fA26DbD58B87717' // Proxy__BobaBillingContract
  public L2BOBATokenAddress = '0x4200000000000000000000000000000000000023' // L2_GLMR (DEV on Moonbase L1)
}


const parseArgs = (): [string, number] => {
  const argv = yargs(hideBin(process.argv)).options({
    destination: { 
      type: 'string', 
      describe: "Destination network for teleport", 
      demandOption: true, 
      choices: ['bobabase', 'moonbase']
    },
    ship: { type: 'number', 
      describe: "Ship's NFT token id", 
      demandOption: true 
    },
  }).argv;
  return [argv.destination, argv.ship]
}

const getNFTContractAddress = (chainId: number): string => {
  return getDeployment(chainId)
}


// For running in HardHat project context (uses PRIV_KEY in .env):
// NOTE: This connects to the given chainId's RPC, not what's given in `--network`
const getWalletFromEnv = (chainId: number, cfg: Config) => {
  let provider = new providers.JsonRpcProvider(cfg.RPC_URIS[chainId])
  return new Wallet(cfg.PRIV_KEYS[chainId]).connect(provider) 
}

const main = async () => {
  let [ destNetwork, shipId ] = parseArgs()

  if (destNetwork == "moonbase") {
    console.log("Teleporting ship from Bobabase to Moonbase Alpha")
    bridgeBobaBaseToMoonbase(shipId)

  } else if (destNetwork == "bobabase") {
    console.log("Teleporting ship from Moonbase Alpha to Bobabase")
    bridgeMoonbaseToBobaBase(shipId)
    
  } else {
    console.error("Error: Must specify destination network as parameter (bobabase, moonbase)");
  }

}


// L2 -> L1 (Assumes Native L2 NFT Orbiter 8 Ship)
const bridgeBobaBaseToMoonbase = async (shipId: number) => {
  let cfg = new Config()

  // @TODO: From the Game Client, use the player's account here, instead of .env
  let payerAccount = getWalletFromEnv(cfg.chainIds['bobabase'], cfg)

  // Approve transferring the Ship NFT to the L2 Bridge
  const L2Ship = new Contract(cfg.BobabaseShipContractAddress, BobabaseShipERC721Json.abi, payerAccount)
  const approveTx = await L2Ship.approve(cfg.L2NFTBridgeAddress, shipId)
  await approveTx.wait()

  // Exit Fee, which L1 bridge must pay to the L1 network. (We pay the L2 bridge in advance)
  const BOBABillingContract = new Contract(cfg.BOBABillingContractAddress, BOBABillingContractJson, payerAccount)
  const exitFee = await BOBABillingContract.exitFee()

  console.log(`Exit Fee is: ${utils.formatEther(exitFee)} BOBA`)
  // NOTE: I get 1000000000000000000 or 1 BOBA)

  // @TODO: This was taken from Boba integration tests, and may not be accurate.
  const L2BOBAToken = new Contract(cfg.L2BOBATokenAddress, L2GovernanceERC20Json, payerAccount)

  // This reverts with an error: "reason: 'execution reverted: L2_BOBA: approve is disabled pending further community discussion."
  // (See GitHub issue https://github.com/Partavate-Studios/orbiter8-multiverse-bobabeam/issues/13)
  const approveBOBATx = await L2BOBAToken.approve(cfg.L2NFTBridgeAddress, exitFee)
  await approveBOBATx.wait()

  const L2NFTBridge = new Contract(cfg.L2NFTBridgeAddress, L2NFTBridgeJson, payerAccount)

  const tx = await L2NFTBridge.withdraw(
    cfg.BobabaseShipContractAddress, 
    shipId,
    9999999 // L2 gas
  )
  await tx.wait()
}

// L1 -> L2 (Assumes Native L1 NFT Orbiter 8 Ship)
const bridgeMoonbaseToBobaBase = async (shipId: number) => {
  let cfg = new Config()

  // @TODO: From the Game Client, use the player's account here, instead of .env
  let payerAccount = getWalletFromEnv(cfg.chainIds['moonbase'], cfg)

  // Approve transferring the Ship NFT to the L2 Bridge
  const L1Ship = new Contract(cfg.MoonbaseShipContractAddress, MoonbaseShipERC721Json.abi, payerAccount)
  const approveTx = await L1Ship.approve(cfg.L1NFTBridgeAddress, shipId)
  await approveTx.wait()

  // @TODO: 2022.08.09: Reverts here, due to needing registration in L1NFTBridge.pairNFTInfo
  const L1NFTBridge = new Contract(cfg.L1NFTBridgeAddress, L1NFTBridgeJson, payerAccount)

  const tx = await L1NFTBridge.depositNFT(
    cfg.MoonbaseShipContractAddress,
    shipId,
    9999999 // L2 gas
  )
  await tx.wait()
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
