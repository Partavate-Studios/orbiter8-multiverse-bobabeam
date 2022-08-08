import { ethers } from "hardhat";
import { logDeployment } from "../lib/logDeployment"

// Deploys Multiverse, for non-bridge networks
async function main() {
  const MulitverseShip = await ethers.getContractFactory("MultiverseShip");
  const ship = await MulitverseShip.deploy();

  await ship.deployed();

  console.log("Ship deployed to:", ship.address);
  let chaindata = await ethers.provider.getNetwork()
  logDeployment(chaindata.chainId, ship.address)
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
