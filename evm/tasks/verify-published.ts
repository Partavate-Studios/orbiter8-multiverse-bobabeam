import { task } from "hardhat/config"
import { logDeployment, getDeployment } from "../lib/logDeployment"

task("verify-published", "Verify deployed contract on Etherscan, using published-addresses.json")
  .setAction(async (address, hre) => {

  let chaindata = await hre.ethers.provider.getNetwork()
  let contractAddress = getDeployment(chaindata.chainId);
  const constructorArgs: string[] = []; // Change if needed

  console.log(`Attempting to verify contract ${contractAddress} on ${chaindata.chainId}`)

  await hre.run("verify:verify", {
    address: contractAddress,
    constructorArguments: constructorArgs
  });


  
})
