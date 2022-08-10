// In each deployed Ship contract, this sets the address of the same contract on the foreign network, for L1/L2 bridging.
// Run this task for each network.
// This enables Boba NFT Bridge to use <L1NFTContract>.l2contract() and <L2NFTContract>.l1contract(), per IL1StandardERC721/IL2StandardERC721
import { task } from "hardhat/config"
import { getDeployment } from "../lib/logDeployment"
const { address, int } = require("hardhat/internal/core/params/argumentTypes")

task("register-foreign", "Sets the cross-bridge Ship NFT contract address in the current network's ship contract")
  .setAction(async ({}, { ethers, network }) => {
    const fs = require("fs");

    let chainId = network.config.chainId
    let chainName = network.name
    let localShipAddress = getDeployment(chainId)
    let foreignContractAddress = ""
    let contractName = "MultiverseShip"
    let method = "Method Unknown"
    let foreignChainId
    
    switch (chainName) {
      case 'moonbase':
        contractName += "_L1"
        method = "setL2Contract"
        foreignChainId = 1297
        foreignContractAddress = getDeployment(foreignChainId)
        break;
      case 'bobabase':
        contractName += "_L2"
        method = "setL1Contract"
        foreignChainId = 1287
        foreignContractAddress = getDeployment(foreignChainId)
        break;
    }

    if ((await ethers.provider.getCode(localShipAddress)) === "0x") {
      console.error("You need to deploy your contracts to both chains first");
      return;
    }
    console.log(`Registering the foreign Ship Contract (${foreignContractAddress}) on: ${localShipAddress} on ${chainName}`);

    const contract = await ethers.getContractAt(contractName, localShipAddress);
    
    const tx = await contract[`${method}`](foreignContractAddress);
  
    console.log(`Registered the cross-chain foreign address successfully.`);
  });
