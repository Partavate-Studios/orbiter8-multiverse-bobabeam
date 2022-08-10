// Real Orbiter8 Ships are are created by the game's ShipLibrary. This provides a utility to manually mint ship NFT tokens.
// DO NOT USE ON PRODUCTION GAME CONTRACTS! (INCLUDING PRODUCTION TESTNET DEPLOYMENTS)
import { task } from "hardhat/config"
import { getDeployment } from "../lib/logDeployment"
const { address, int } = require("hardhat/internal/core/params/argumentTypes")

task("mint", "Mint a Ship NFT to the given address")
  .addParam("shipId", "The NFT token id. (Usually handled by the Orbiter8 Game contract)", false, int)
  .addOptionalParam("name", "The Ship's Name", "Orbiter 8 Multiverse Ship")
  .addOptionalParam("to", "The address that will own the minted NFT", address)
  .setAction(async ({ shipId, name, to, quantity }, { ethers, network }) => {
    const fs = require("fs");

    let chainId = network.config.chainId
    let chainName = network.name
    let contractAddress = getDeployment(chainId);
    let contractName = "MultiverseShip"

    switch (chainName) {
      case 'moonbase':
        contractName += "_L1"
        break;
      case 'bobabase':
        contractName += "_L2"
        break;
    }

    const [myAccount] = await ethers.getSigners();
    let toAddress = to ?? myAccount.address;
    console.log(`Minting a ${contractName} NFT to address: ${toAddress} on ${chainName}`);

    if ((await ethers.provider.getCode(contractAddress)) === "0x") {
      console.error("You need to deploy your contract first");
      return;
    }

    const contract = await ethers.getContractAt(contractName, contractAddress);

    console.log("Minting, please wait...");
    
    // NOTE: mint() takes a standardized encoded data argument for bridges to rehydrate metadata
    const bridgableMetaData = ethers.utils.defaultAbiCoder.encode(["string"], [name])
    const tx = await contract.mint(toAddress, shipId, bridgableMetaData);
  

    console.log(`Minted a Ship NFT, owned by ${toAddress}`);
  });

