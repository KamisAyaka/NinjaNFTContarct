// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import "forge-std/Test.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "../src/NinjaNFTContarct.sol";

contract NinjaNFTContarctTest is Test {
    using Strings for uint256;

    NinjaNFTContarct internal ninjaNFT;

    address internal constant MINTER = address(0xBEEF);
    address internal constant SECOND_MINTER = address(0xCAFE);

    uint256 internal constant MAX_SUPPLY = 5;
    uint256 internal constant MAX_PER_WALLET = 2;
    string internal constant BASE_URI = "https://ninja.example/api/";

    function setUp() public {
        ninjaNFT = new NinjaNFTContarct(MAX_SUPPLY, MAX_PER_WALLET, BASE_URI);
    }

    function testInitialState() public view {
        assertEq(ninjaNFT.maxSupply(), MAX_SUPPLY);
        assertEq(ninjaNFT.maxPerWallet(), MAX_PER_WALLET);
        assertEq(ninjaNFT.mintActive(), false);
        assertEq(ninjaNFT.totalMinted(), 0);
    }

    function testMintFailsWhenClosed() public {
        vm.expectRevert(NinjaNFTContarct.MintClosed.selector);
        ninjaNFT.mint(1);
    }

    function testMintFailsForZeroQuantity() public {
        ninjaNFT.setMintActive(true);
        vm.expectRevert(NinjaNFTContarct.QuantityZero.selector);
        ninjaNFT.mint(0);
    }

    function testMintFailsForNonZeroPayment() public {
        ninjaNFT.setMintActive(true);
        vm.deal(MINTER, 1 ether);
        vm.prank(MINTER);
        vm.expectRevert(NinjaNFTContarct.NonZeroPayment.selector);
        ninjaNFT.mint{value: 1}(1);
    }

    function testMintSuccessUpdatesState() public {
        ninjaNFT.setMintActive(true);
        vm.prank(MINTER);
        ninjaNFT.mint(2);

        assertEq(ninjaNFT.totalMinted(), 2);
        assertEq(ninjaNFT.minted(MINTER), 2);
        assertEq(ninjaNFT.ownerOf(1), MINTER);
        assertEq(ninjaNFT.ownerOf(2), MINTER);
    }

    function testMintRespectsWalletCap() public {
        ninjaNFT.setMintActive(true);

        vm.prank(MINTER);
        ninjaNFT.mint(2);

        vm.prank(MINTER);
        vm.expectRevert(NinjaNFTContarct.WalletLimitExceeded.selector);
        ninjaNFT.mint(1);
    }

    function testMintRespectsTotalSupply() public {
        ninjaNFT.setMintActive(true);

        vm.prank(MINTER);
        ninjaNFT.mint(2);

        vm.prank(SECOND_MINTER);
        ninjaNFT.mint(2);

        vm.prank(address(0xD00D));
        vm.expectRevert(NinjaNFTContarct.SupplyExceeded.selector);
        ninjaNFT.mint(2);
    }

    function testBaseURIManagement() public {
        ninjaNFT.setMintActive(true);
        vm.prank(MINTER);
        ninjaNFT.mint(1);

        assertEq(ninjaNFT.tokenURI(1), string.concat(BASE_URI, uint256(1).toString()));

        string memory updatedBase = "ipfs://hash/";
        ninjaNFT.setBaseURI(updatedBase);

        assertEq(ninjaNFT.tokenURI(1), string.concat(updatedBase, uint256(1).toString()));
    }

    function testOwnerCanToggleMint() public {
        ninjaNFT.setMintActive(true);
        assertTrue(ninjaNFT.mintActive());

        ninjaNFT.setMintActive(false);
        assertFalse(ninjaNFT.mintActive());
    }

    function testConstructorRevertsForInvalidConfig() public {
        vm.expectRevert(NinjaNFTContarct.SupplyExceeded.selector);
        new NinjaNFTContarct(0, MAX_PER_WALLET, BASE_URI);

        vm.expectRevert(NinjaNFTContarct.WalletLimitExceeded.selector);
        new NinjaNFTContarct(MAX_SUPPLY, 0, BASE_URI);

        vm.expectRevert(NinjaNFTContarct.WalletLimitExceeded.selector);
        new NinjaNFTContarct(1, 2, BASE_URI);
    }
}
