import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";
import { token } from "../typechain-types/@openzeppelin/contracts";

// Base Class
describe("MultiverseShip", function () {
  async function deployShip() {
    const MvsContract = await ethers.getContractFactory("MultiverseShip")
    const ship = await MvsContract.deploy()

    // Contracts are deployed using the first signer/account by default
    // Use the next addresses as bridge, player/mintee, and a random address
    const [owner, bridge, player, rando] = await ethers.getSigners()
    return { ship, owner, bridge, player, rando }
  }

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const { ship, owner } = await deployShip()
      expect(await ship.owner()).to.equal(owner.address)
    });

    it("Should allow minting from the owner, known bridges, and no one else", async function() {
      const { ship, owner, bridge, player, rando } = await deployShip();
      const tokenId = 777;
      const shipName = ethers.utils.defaultAbiCoder.encode(["string"], ["A ship has no name"])
      const network = await ethers.getDefaultProvider().getNetwork()
      const chainId = await network.chainId
      // Direct mint
      await ship.mint(player.address, tokenId, shipName)
      expect(await ship.ownerOf(tokenId)).to.equal(player.address)

      // Bridge mint
      ship.setNetworkBridge(chainId, bridge.address)
      await ship.connect(bridge).mint(player.address, tokenId+1, shipName)
      expect(await ship.ownerOf(tokenId+1)).to.equal(player.address)

      // // Rando mint (should fail)
      expect(ship.connect(rando)
        .mint(player.address, tokenId+2, shipName)
      ).to.eventually.be.rejectedWith("Only Game or Network Bridge can mint and burn")
    });
  });
});
 
// L2 Contract (for use with BobaBeam test network)
describe("MultiverseShip_L1", function () {
  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const MvsContract = await ethers.getContractFactory("MultiverseShip_L1")
      const mvs = await MvsContract.deploy()

      // Contracts are deployed using the first signer/account by default
      const [owner, otherAccount] = await ethers.getSigners()
      expect(await mvs.owner()).to.equal(owner.address)
      
    });
  });
});
 
// L1 Contract (for use with Moonbase Alpha test network)
describe("MultiverseShip_L2", function () {
  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      const MvsContract = await ethers.getContractFactory("MultiverseShip_L2");
      const mvs = await MvsContract.deploy();

      // Contracts are deployed using the first signer/account by default
      const [owner, otherAccount] = await ethers.getSigners();
      expect(await mvs.owner()).to.equal(owner.address);
      
    });
  });
});
 