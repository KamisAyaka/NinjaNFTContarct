// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import {Test} from "forge-std/Test.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";
import {NinjaNFTContarct} from "../src/NinjaNFTContarct.sol";

contract NinjaNFTContarctTest is Test {
    using Strings for uint256;

    NinjaNFTContarct internal ninjaNft;

    address internal constant MINTER = address(0xBEEF);
    address internal constant SECOND_MINTER = address(0xCAFE);

    uint256 internal constant MAX_SUPPLY = 5;
    uint256 internal constant MAX_PER_WALLET = 2;
    string internal constant BASE_URI = "https://ninja.example/api/";

    function setUp() public {
        ninjaNft = new NinjaNFTContarct(MAX_SUPPLY, MAX_PER_WALLET, BASE_URI);
    }

    function testInitialState() public view {
        assertEq(ninjaNft.MAX_SUPPLY(), MAX_SUPPLY);
        assertEq(ninjaNft.MAX_PER_WALLET(), MAX_PER_WALLET);
        assertEq(ninjaNft.mintActive(), false);
        assertEq(ninjaNft.totalMinted(), 0);
    }

    function testMintFailsWhenClosed() public {
        vm.expectRevert(NinjaNFTContarct.MintClosed.selector);
        ninjaNft.mint(1);
    }

    function testMintFailsForZeroQuantity() public {
        ninjaNft.setMintActive(true);
        vm.expectRevert(NinjaNFTContarct.QuantityZero.selector);
        ninjaNft.mint(0);
    }

    function testMintFailsForNonZeroPayment() public {
        ninjaNft.setMintActive(true);
        vm.deal(MINTER, 1 ether);
        vm.prank(MINTER);
        vm.expectRevert(NinjaNFTContarct.NonZeroPayment.selector);
        ninjaNft.mint{value: 1}(1);
    }

    function testMintSuccessUpdatesState() public {
        ninjaNft.setMintActive(true);
        vm.prank(MINTER);
        ninjaNft.mint(2);

        assertEq(ninjaNft.totalMinted(), 2);
        assertEq(ninjaNft.minted(MINTER), 2);
        assertEq(ninjaNft.ownerOf(1), MINTER);
        assertEq(ninjaNft.ownerOf(2), MINTER);
    }

    function testMintRespectsWalletCap() public {
        ninjaNft.setMintActive(true);

        vm.prank(MINTER);
        ninjaNft.mint(2);

        vm.prank(MINTER);
        vm.expectRevert(NinjaNFTContarct.WalletLimitExceeded.selector);
        ninjaNft.mint(1);
    }

    function testMintRespectsTotalSupply() public {
        ninjaNft.setMintActive(true);

        vm.prank(MINTER);
        ninjaNft.mint(2);

        vm.prank(SECOND_MINTER);
        ninjaNft.mint(2);

        vm.prank(address(0xD00D));
        vm.expectRevert(NinjaNFTContarct.SupplyExceeded.selector);
        ninjaNft.mint(2);
    }

    function testBaseURIManagement() public {
        ninjaNft.setMintActive(true);
        vm.prank(MINTER);
        ninjaNft.mint(1);

        assertEq(ninjaNft.tokenURI(1), string.concat(BASE_URI, uint256(1).toString()));

        string memory updatedBase = "ipfs://hash/";
        ninjaNft.setBaseURI(updatedBase);

        assertEq(ninjaNft.tokenURI(1), string.concat(updatedBase, uint256(1).toString()));
    }

    function testOwnerCanToggleMint() public {
        ninjaNft.setMintActive(true);
        assertTrue(ninjaNft.mintActive());

        ninjaNft.setMintActive(false);
        assertFalse(ninjaNft.mintActive());
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
