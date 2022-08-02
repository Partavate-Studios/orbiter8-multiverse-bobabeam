// SPDX-License-Identifier: LGPL-3.0-or-later
// Orbiter8 Trademark, Contract name/symbol reserved by Partavate Studios
// July 24, 2022

pragma solidity ^0.8.9;

// Import this file to use console.log
import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import { IERC721 } from "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import { IERC165 } from "@openzeppelin/contracts/utils/introspection/IERC165.sol";

// Base Contract for O8 MultiverseShip
// This contract is both the standard contract on most networks
// As well as the base for those with special functions for network-specific bridges
contract MultiverseShip is IERC165, IERC721, ERC721, Ownable {
    enum ShipStatus{Unregistered, Active, BridgeLocked}
    enum TeleportDirection{Out, In}

    // Contract Storage
    mapping(uint256 => address) private networkBridges; // chainId => BridgeAddress
    mapping(address => bool) private authorizedBridges; // Used for security modifier

    // per-Token Storage

    struct Ship {
        string name;
        ShipStatus state;
    }
    mapping(uint256 => Ship) private ships;
    
    // Custom Events
    event BridgeTeleport(uint256 indexed shipId, uint256 indexed chainId, TeleportDirection direction);
    event Mint(address indexed _account, uint256 _tokenId);
    event Burn(uint256 _tokenId);

    modifier onlyOwnerOrBridge {
        require((authorizedBridges[msg.sender] == true || msg.sender == owner()), "Only Game or Network Bridge can mint and burn");
        _;
    }

    constructor() ERC721(
        "Multiverse Starships - Orbiter 8 Bobabeam Testflight 0.1",
        "O8MVSS"
    ) {}

    // For Boba L2 Bridge Compatibility
    function supportsInterface(bytes4 _interfaceId) public view override(IERC165, ERC721) virtual returns (bool) {
        return super.supportsInterface(_interfaceId);
    }

    function setNetworkBridge(uint dstChainId, address networkLocalBridge) external onlyOwner {
        authorizedBridges[networkLocalBridge] = true;
        networkBridges[dstChainId] = networkLocalBridge;
    }

    // REVIEW: Any reason this can't be exposed publicly?
    function getNetworkBridge(uint dstChainId) public view returns (address) {
        return networkBridges[dstChainId];
    }

    // Mint if called by the Game contract
    // Teleport back to active state, for same player if called by a bridge
    function mint(address owner, uint256 shipId, bytes memory data) virtual public onlyOwnerOrBridge {
        // TODO: This is a somewhat likely case, as different players sequentially mint ships on different networks.
        require((!_exists(shipId) || ownerOf(shipId) == owner), 
            string(abi.encodePacked("ERROR: Ship Id", shipId, " belongs to another player!")));

        // TODO: Rehydrate _data into Metadata
        (string memory _shipName) = abi.decode(data, (string));

        // Incoming from Bridge: Only mint new if shipId+owner didn't exist
        if (authorizedBridges[msg.sender] == true) {
            if (_exists(shipId)) {
                ships[shipId].state = ShipStatus.Active;
                if (ownerOf(shipId) == owner) {
                    // Ship already exists, so no mint neccessary
                    return;
                }
            }
            emit BridgeTeleport(shipId, block.chainid, TeleportDirection.In);
        }
        // Create new ship if shipId is new
        _mint(owner, shipId);
        ships[shipId].state = ShipStatus.Active;
        ships[shipId].name = _shipName;
        emit Mint(owner, shipId);
    }

    // Backwards compatible function: Note args are reversed!
    function mintShip(uint256 shipId, address owner) external onlyOwner {
        _mint(owner, shipId);
    }

    // Burns the ship if called by the Game contract
    // Locks the ship temporarily if called by the Bridge 
    // The play can regain the shipId later, and the client can display this state.
    function burn(uint256 shipId) virtual public onlyOwnerOrBridge {
        if (authorizedBridges[msg.sender] == true) {
            ships[shipId].state = ShipStatus.BridgeLocked;
            emit BridgeTeleport(shipId, block.chainid, TeleportDirection.Out);
        } else {
            _burn(shipId);
            emit Burn(shipId);
        }
    }

    function bridgeExtraData(uint256 shipId) public view returns(bytes memory) {
        return abi.encode(ships[shipId].name);
    }

    function tokenURI(uint256 shipId) public view override returns (string memory) {
        require(_exists(shipId), "ERC721Metadata: URI query for nonexistent token");
        return string(abi.encodePacked("https://orbiter8.com/tokens/ship/", Strings.toString(block.chainid), "/", Strings.toString(shipId)));
    }

    function getName(uint256 shipId) public view returns (string memory) {
        require(_exists(shipId), "ERC721Metadata: Name query for nonexistent token");
        return ships[shipId].name;
    }

}