// SPDX-License-Identifier: LGPL-3.0-or-later
// Orbiter8 Trademark, Contract name/symbol reserved by Partavate Studios
// July 24, 2022

pragma solidity ^0.8.9;

// Import this file to use console.log
import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./vendor/boba/IL2StandardERC721.sol";

contract MultiverseShip is IL2StandardERC721, ERC721, Ownable {
    enum ShipStatus{Unregistered, Active, BridgeLocked}
    enum TeleportDirection{Out, In}

    // Contract Storage
    mapping(uint256 => address) private networkBridges; // chainId => BridgeAddress
    mapping(address => bool) private authorizedBridges; // Used for security modifier
    // per-Token Storage
    mapping(uint256 => ShipStatus) private shipStates;
    mapping(uint256 => string) private shipName;

    event BridgeTeleport(uint256 indexed shipId, uint256 indexed chainId, TeleportDirection direction);

    modifier onlyOwnerOrBridge {
        require((authorizedBridges[msg.sender] == true || msg.sender == owner()), "Only Game or Network Bridge can mint and burn");
        _;
    }

    constructor() ERC721(
        "Multiverse Starships - Orbiter 8 BobaBeam Testflight 0.1",
        "O8MVSS"
    ) {}

    // For Boba L2 Bridge Compatibility
    function supportsInterface(bytes4 _interfaceId) public view override(IERC165, ERC721) returns (bool) {
        // REVIEW: Unsure if/why the foreign contract .selector (ABI function selector) is required here.
        // If so, this is going to require a new mapping and setter.
        // bytes4 bridgingSupportedInterface = IL2StandardERC721.THE_FOREIGN_CONTRACT_ADDRESS.selector
        bytes4 bridgingSupportedInterface = 
            /*^*/  IL2StandardERC721.mint.selector
            ^ IL2StandardERC721.burn.selector;
        return _interfaceId == bridgingSupportedInterface || super.supportsInterface(_interfaceId);
    }

    function setNetworkBridge(uint dstChainId, address networkLocalBridge) external onlyOwner {
        authorizedBridges[networkLocalBridge] = true;
        networkBridges[dstChainId] = networkLocalBridge;
    }

    // REVIEW: Any reason this can't be exposed publicly?
    function getNetworkBridge(uint dstChainId) public returns (address) {
        return networkBridges[dstChainId];
    }

    // Mint if called by the Game contract
    // Teleport back to active state, for same player if called by a bridge
    function mint(address owner, uint256 shipId, bytes memory data) external override onlyOwnerOrBridge {
        // TODO: Rehydrate _data into Metadata
        (string memory _shipName) = abi.decode(data, (string));

        // Incoming from Bridge: Only mint new if shipId+owner didn't exist
        // TODO: Unhandled case: tokenId exists but under a different owner
        if (authorizedBridges[msg.sender] == true) {
            shipStates[shipId] = ShipStatus.Active;
            emit BridgeTeleport(shipId, block.chainid, TeleportDirection.In);
            if (ownerOf(shipId) == owner) {
                return;
            }
        }
        // Create new ship if 
        _mint(owner, shipId);
        shipStates[shipId] = ShipStatus.Active;
        emit Mint(owner, shipId);
    }

    // Backwards compatible function: Note args are reversed!
    function mintShip(uint256 shipId, address owner) external onlyOwner {
        _mint(owner, shipId);
    }

    // Burns the ship if called by the Game contract
    // Locks the ship temporarily if called by the Bridge 
    // The play can regain the shipId later, and the client can display this state.
    function burn(uint256 shipId) external onlyOwnerOrBridge {
        if (authorizedBridges[msg.sender] == true) {
            shipStates[shipId] = ShipStatus.BridgeLocked;
            emit BridgeTeleport(shipId, block.chainid, TeleportDirection.Out);
        } else {
            _burn(shipId);
            emit Burn(shipId);
        }
    }

    function bridgeExtraData(uint256 shipId) public view returns(bytes memory) {
        return abi.encode(shipName[shipId]);
    }

    /**
     * overriding method
     */
    function tokenURI(uint256 shipId) public view override returns (string memory) {
        require(_exists(shipId), "ERC721Metadata: URI query for nonexistent token");
        return string(abi.encodePacked("https://orbiter8.com/tokens/ship/", Strings.toString(block.chainid), "/", Strings.toString(shipId)));
    }

}