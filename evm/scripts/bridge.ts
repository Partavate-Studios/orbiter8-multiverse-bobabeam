// Simple NFT Bridging using Boba + Moonbeam
// Written for the game Orbiter 8, by Partavate Studios
// THIS IS UNTESTED (due to missing Boba APIs, and undefined `L2BOBAToken`)

// Usage: `npx ts-node scripts/bridge.ts (bobabase|moonbase} shipId`
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


// Boba Imports
// @BLOCKED: We lack the L{1,2}NFTBridgeJson artifacts. Requested at https://discord.com/channels/795820411836563466/841128990588534844/1006297196863443045
const L1NFTBridgeJson = require('@boba/contracts/artifacts/contracts/bridges/L1NFTBridge.sol/L1NFTBridge.json')
const L2NFTBridgeJson = require('@boba/contracts/artifacts/contracts/bridges/L2NFTBridge.sol/L2NFTBridge.json')
const BOBABillingContractJson = require('@boba/contracts/artifacts/contracts/L2BillingContract.sol.sol/L2BillingContract.json')

// Partavate Studios Contracts
const MoonbaseShipERC721Json =  require('../artifacts/contracts/MultiverseShip.L2.sol/MultiverseShip_L1.json')
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
  public MoonbaseShipContractAddress = '0x2AA7935255d88Af930bA66153CA22506490562cb'
  public BobabaseShipContractAddress = '0x4dEdce8EDCD60ED9dA91b55c1E9e76e23830535d'
  
  // From https://github.com/bobanetwork/boba/blob/develop/packages/boba/register/addresses/addressesBobaBase_0xF8d0bF3a1411AC973A606f90B2d1ee0840e5979B.json
  // TODO: Boba has an AddressManager contract, but without an ABI, we can't use it...
  public ADDRESS_MANAGER_ADDRESS = '0x93A96D6A5beb1F661cf052722A1424CDDA3e9418'
  public L1NFTBridgeAddress = '0xf5aCb091936715eCAC49d5759b4801703a175387'
  public L2NFTBridgeAddress = '0x64371C6b9acFDBC14A98CD794a531Ff737Ef0F98'

  public BOBABillingContractAddress = '0x05C9f36D901594D220311B211fA26DbD58B87717'
}


const parseArgs = () => {
  if (process.argv.length , 3) {
    console.error(`Usage: npx ts-node (bobabase|moonbase} shipId`)
    process.exit(2)
  }
  // Super crude, but works.
  const destNetwork = process.argv.at(-2)
  const shipId = process.argv.at(-3)
  return { destNetwork, shipId }
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
  let { destNetwork, shipId } = parseArgs()

  if (process.argv.at(-1) == "moonbase") {
    console.log("Teleporting ship from Bobabase to Moonbase Alpha")
    // bridgeBobaBaseToMoonbase(shipId)

  } else if (process.argv.at(-1) == "bobabase") {
    console.log("Teleporting ship from Moonbase Alpha to Bobabase")
    // 

  } else {
    console.error("Error: Must specify destination network as parameter (bobabase, moonbase)");
  }
  console.log(process.argv)

}


// L2 -> L1 (Assumes Native L2 NFT Orbiter 8 Ship)
const bridgeBobaBaseToMoonbase = async (shipId: number) => {
  let cfg = new Config()

  // @TODO: From the Game Client, use the player's account here, instead of .env
  let payerAccount = getWalletFromEnv(cfg.chainIds['bobabase'], cfg)

  // Approve transferring the Ship NFT to the L2 Bridge
  const L2NFT = new Contract(cfg.BobabaseShipContractAddress, BobabaseShipERC721Json.abi, payerAccount)
  const approveTx = await L2NFT.approve(cfg.L2NFTBridgeAddress, shipId)
  await approveTx.wait()

  // Exit Fee, which L1 bridge must pay to the L1 network. (We pay the L2 bridge in advance)
  const BOBABillingContract = new Contract(cfg.BOBABillingContractAddress, BOBABillingContractJson.abi)
  const exitFee = await BOBABillingContract.exitFee()
  // @BLOCKED: Is L2BOBAToken the ERC20? Not sure what's needed here for address/ABI 
  const approveBOBATx = await L2BOBAToken.approve(  //                                    <---------- BROKEN CODE 
    cfg.L2NFTBridgeAddress,
    exitFee
  )
  await approveBOBATx.wait()

  const L2NFTBridge = new Contract(cfg.L2NFTBridgeAddress, L2NFTBridgeJson.abi, payerAccount)

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
  const L1NFT = new Contract(cfg.MoonbaseShipContractAddress, MoonbaseShipERC721Json.abi, payerAccount)
  const approveTx = await L1NFT.approve(cfg.L1NFTBridgeAddress, shipId)
  await approveTx.wait()

  const L1NFTBridge = new Contract(cfg.L1NFTBridgeAddress, L1NFTBridgeJson.abi, payerAccount)

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
