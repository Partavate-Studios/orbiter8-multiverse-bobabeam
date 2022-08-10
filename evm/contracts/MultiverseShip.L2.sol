// SPDX-License-Identifier: LGPL-3.0-or-later
// Orbiter8 Trademark, Contract name/symbol reserved by Partavate Studios
// July 24, 2022

pragma solidity ^0.8.9;

// Import this file to use console.log
import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./vendor/boba/IL2StandardERC721.sol";
import "./MultiverseShip.sol";

// Bobabase L2 Contract for O8 MultiverseShip
// Note: this conforms to IL2StandardERC721, but not explicitly inheriting it, due to redeclarations of events in MultiverseShip (which is not IL2StandardERC721)
contract MultiverseShip_L2 is MultiverseShip {

    // For Boba's IL2StandardERC721 compatibility (ideally this would be a mapping value at [chainId])
    address public l1Contract;

    // For Boba L2 Bridge Compatibility
    function supportsInterface(bytes4 _interfaceId) public view override(MultiverseShip) returns (bool) {
        bytes4 bridgingSupportedInterface = IL2StandardERC721.l1Contract.selector
            ^  IL2StandardERC721.mint.selector
            ^ IL2StandardERC721.burn.selector
            ^ this.bridgeExtraData.selector;
        return _interfaceId == bridgingSupportedInterface || super.supportsInterface(_interfaceId);
    }
    
    // Sets the address returned by IL2StandardERC721.l1Contract()
    // This provides compliance with IL2StandardERC721 and the bridge's supportsInterface()
    function setL1Contract(address _l1Contract) public onlyOwner {
        l1Contract = _l1Contract;
    }
}