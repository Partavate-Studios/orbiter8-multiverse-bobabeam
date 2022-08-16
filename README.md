# Orbiter 8 Multiverse Demo

![Orbiter 8 Portal Demo](/orbiter8-portal-demo.png)

[This demo](https://demos.partavate.com/o8-multiverse-bobabeam) is a *proof of concept* for
[Orbiter 8](https://orbiter8.com)'s *multiverse mechanics* and was created by
[Partavate Studios](https://partavate.com) as a submission for the
[Bobabeam hackathon](https://bobaxmoonbeam.notion.site/bobaxmoonbeam/BOBA-x-MOONBEAM-HACK-CHALLENGE-264b16c0ea2b4878b7c03a708df7653d). Special thanks to [Boba Network](https://boba.network/) and
[Moonbeam Network](https://moonbeam.network/) for the opportunity.


## About This Demo

This demo is a standalone feature demo representing work planned for the Orbiter8.

[View Live Demo](https://demos.partavate.com/o8-multiverse-bobabeam)

### What is Orbiter 8?

[Orbiter 8](https://orbiter8.com/) is a space trading MMO designed to run entirely on a distributed ledger network. Being fully decentralized in this way, the game is client agnostic so anyone can build a different client interface that will work with the same game. Game assets have token interfaces so ships and planets can be traded as ERC721 NFTs. The in-game currency, galactic credits, can also be traded as ERC20 tokens. The game world, a directed network of stars, is near-infinite and dynamically generated as players explore the frontier. The game is designed for the Ethereum Virtual Machine and can be deployed to most EVM compatible networks.


### Where can I play Orbiter 8?

You can [go play Orbiter 8 Demo 3 right now](https://orbiter8.com/play). This demo is the 3rd of 4 planned demo on the path to minimum viable game and is available on a variety of networks including Moonriver, Moonbase, and Bobabase. Note that **Demo 3 is unrealted from this project**, the portals demo.

[![Play Orbiter 8 Demo 3](./play-orbiter8-demo3-now.png)](https://orbiter8.com/play)


### What do you mean, "Multiverse Mechanic?"

Orbiter 8 is a multi-chain application. This means that distinct instances of the game universe run on each distributed ledger network. Each distinct game instance represents a unique galaxy for gamers to engage and explore. With portals, gamers will be able to fly their ship to another universe - which will move their ship NFT to another network through a bridge. With unique networks connected through portals, a multiverse emerges.


### What's the demo do?

This demo contains two key sections.

1. The first is a basic story animation to establish the context of the game world. It contains 6 story tellings lides.
2. The second section provides an interface to teleport a ship NFT between the Moonbase and Bobabase networks.


## Deployment and Initialization

_Ensure your .env file is setup correctly!_

1. Deploy L1 and L2 Contracts

    ```
    npx hardhat run scripts/deploy-L1.ts --network moonbase
    #  L1 MultiverseShip deployed to: 0xB8f9Ef0223713777B6cd722DD299febEEB71012D
    ```

    ```
    npx hardhat run scripts/deploy-L2.ts --network bobabase
    #  L2 MultiverseShip deployed to: 0x58e60385A8883B3AA1539a0b969eC2EAd537589E
    ```

    Note that deployment to public chains will save the address in `evm/addresses/published-addresses.json`.

    Mint, Verify, and Bridge tasks/scripts will read the contract addresses from this file.

2. Publish and Verify the contract source code with the networks' block explorers.

    ```
    npx hardhat verify-published --network moonbase
    #  Successfully submitted source code for contract
    #  contracts/MultiverseShip.L1.sol:MultiverseShip_L1 at 0xB8f9Ef0223713777B6cd722DD299febEEB71012D

    #  Successfully verified contract MultiverseShip_L1 on Etherscan.
    #  https://moonbase.moonscan.io/address/0xB8f9Ef0223713777B6cd722DD299febEEB71012D#code

    npx hardhat verify-published --network bobabase
    #  Attempting to verify contract 0x58e60385A8883B3AA1539a0b969eC2EAd537589E on 1297
    #
    #  Successfully verified contract MultiverseShip_L2 on Etherscan.
    #  https://blockexplorer.bobabase.boba.network/address/0x58e60385A8883B3AA1539a0b969eC2EAd537589E#code
    ```

3. Set the foreign contract address in the deployed contracts. This informs the bridge on how to transfer it across networks.

    ```
    npx hardhat register-foreign --network moonbase
    #  Registering the foreign Ship Contract (0x58e60385A8883B3AA1539a0b969eC2EAd537589E) on: 0xB8f9Ef0223713777B6cd722DD299febEEB71012D on moonbase
    #  Registered the cross-chain foreign address successfully.
    ```

    ```
    npx hardhat register-foreign --network bobabase
    # Registering the foreign Ship Contract (0xB8f9Ef0223713777B6cd722DD299febEEB71012D) on: 0x58e60385A8883B3AA1539a0b969eC2EAd537589E on bobabase
    # Registered the cross-chain foreign address successfully.
    ```

4. Mint Ship NFT tokens for use in testing bridging

    Normally the Orbiter 8 game contract (ShipLibrary.sol) should be the only actor minting Ships.

    However for testing, and only with non-production ship contracts, tokens may be manually minted using the `mint` task.

    Note that a TokenId (Ship Id) must be provided. This will cause collisions if done on production game contract deployments!

    ```
    npx hardhat mint --network moonbase --name "MVS Moonbase" --ship-id 1287

    npx hardhat mint --network bobabase --name "MVS Bobabase" --ship-id 1297
    ```


5. Register the contract with the Boba NFT Bridge

    The contract addresses must be registered in the Bobabase NFT bridge registry.

    **(This must be done by the Boba team currently.)**


### Bridging Ships Across Networks

1. Restore the imported Boba ABI JSON files (Deploying our contracts clears `artifacts/`)

    ```
    git restore artifacts/contracts/vendor/boba/
    ```


2. Moonbase to Bobabase (L1 to L2 with an L1 Native NFT)

    ```
    npx ts-node scripts/bridge.ts --destination bobabase --ship 1287
    ```

    As of 2022.08.09, this reverts, due to lack of registration in the L1NFTBridge (as expected).

    Full output: https://gist.github.com/excalq/1bda1420c6c6ce43b19fa1d3a4b260d0


3. Bobabase to Moonbase (L2 to L1 with an L2 Native NFT)

    This action requires paying an "exit fee" to the bridge, which currently fails when using the `L2BOBAToken` at `0x4200000000000000000000000000000000000006`

    ```
    npx ts-node scripts/bridge.ts --destination moonbase --ship 1297
    ```

    As of 2022.08.09, this reverts, due to an unexpected error, `L2_BOBA: approve is disabled pending further community discussion.`

    Full output: https://gist.github.com/excalq/20c444fb8b60ecb237c00d33430e9162


## Links

[Live Demo](https://demos.partavate.com/o8-multiverse-bobabeam)

[Orbiter 8 Info](https://orbiter8.com/)

[Partavate Info](https://partavate.com)

