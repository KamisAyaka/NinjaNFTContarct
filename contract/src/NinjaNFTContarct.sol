// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";

/// @title NinjaNFTContarct
/// @notice Simple free-mint ERC721 collection with per-wallet limits and owner-controlled metadata.
contract NinjaNFTContarct is ERC721, Ownable {
    error MintClosed();
    error QuantityZero();
    error SupplyExceeded();
    error WalletLimitExceeded();
    error NonZeroPayment();

    uint256 public immutable MAX_SUPPLY;
    uint256 public immutable MAX_PER_WALLET;

    bool public mintActive;
    uint256 private _nextTokenId = 1;
    uint256 private _totalMinted;
    string private _baseTokenUri;

    mapping(address => uint256) public minted;

    event BaseURIUpdated(string newBaseURI);
    event MintStatusChanged(bool mintActive);

    constructor(
        uint256 maxSupply_,
        uint256 maxPerWallet_,
        string memory baseTokenUri_
    ) ERC721("Ninja NFT", "NINJA") Ownable(msg.sender) {
        if (maxSupply_ == 0) revert SupplyExceeded();
        if (maxPerWallet_ == 0) revert WalletLimitExceeded();
        if (maxPerWallet_ > maxSupply_) revert WalletLimitExceeded();

        MAX_SUPPLY = maxSupply_;
        MAX_PER_WALLET = maxPerWallet_;
        _baseTokenUri = baseTokenUri_;
    }

    /// @notice Toggle the mint status.
    function setMintActive(bool active) external onlyOwner {
        mintActive = active;
        emit MintStatusChanged(active);
    }

    /// @notice Update base token URI for metadata.
    function setBaseURI(string calldata newBaseURI) external onlyOwner {
        _baseTokenUri = newBaseURI;
        emit BaseURIUpdated(newBaseURI);
    }

    /// @notice Mint `quantity` tokens for free.
    function mint(uint256 quantity) external payable {
        if (!mintActive) revert MintClosed();
        if (quantity == 0) revert QuantityZero();
        if (msg.value != 0) revert NonZeroPayment();

        uint256 newTotalMinted = _totalMinted + quantity;
        if (newTotalMinted > MAX_SUPPLY) revert SupplyExceeded();

        uint256 newWalletMinted = minted[msg.sender] + quantity;
        if (newWalletMinted > MAX_PER_WALLET) revert WalletLimitExceeded();

        minted[msg.sender] = newWalletMinted;

        _totalMinted = newTotalMinted;
        for (uint256 i = 0; i < quantity; i++) {
            _safeMint(msg.sender, _nextTokenId++);
        }
    }

    function totalMinted() external view returns (uint256) {
        return _totalMinted;
    }

    function _baseURI() internal view override returns (string memory) {
        return _baseTokenUri;
    }
}
