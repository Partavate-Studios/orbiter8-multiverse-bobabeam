// SPDX-License-Identifier: LGPL-3.0-or-later
// Orbiter8 Trademark, Contract name/symbol reserved by Partavate Studios
// July 24, 2022

pragma solidity ^0.8.9;

// Import this file to use console.log
import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./vendor/boba/IL1StandardERC721.sol";
import "./MultiverseShip.sol";

// Moonbase Alpha L1 Contract for O8 MultiverseShip
// Note: this conforms to IL2StandardERC721, but not explicitly inheriting it, due to redeclarations of events in MultiverseShip (which is not IL1StandardERC721)
contract MultiverseShip_L1 is MultiverseShip {

    // For Boba's IL2StandardERC721 compatibility (ideally this would be a mapping value at [chainId])
    address public l2Contract;

    // For Boba L2 Bridge Compatibility
    function supportsInterface(bytes4 _interfaceId) public view override(MultiverseShip) returns (bool) {
        bytes4 bridgingSupportedInterface = IL1StandardERC721.l2Contract.selector
            ^  IL1StandardERC721.mint.selector
            ^ IL1StandardERC721.burn.selector
            ^ this.bridgeExtraData.selector;
        return _interfaceId == bridgingSupportedInterface || super.supportsInterface(_interfaceId);
    }

    // Sets the address returned by IL1StandardERC721.l2Contract()
    // This provides compliance with IL1StandardERC721 and the bridge's supportsInterface()
    function setL2Contract(address _l2Contract) public onlyOwner {
        l2Contract = _l2Contract;
    }
}