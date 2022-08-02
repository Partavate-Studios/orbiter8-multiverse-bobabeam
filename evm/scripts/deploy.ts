import { ethers } from "hardhat";

async function main() {
  const MulitverseShip = await ethers.getContractFactory("Multiverse");
  const ship = await MulitverseShip.deploy();

  await ship.deployed();

  console.log("Ship deployed to:", ship.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
