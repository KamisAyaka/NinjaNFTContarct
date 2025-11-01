// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

import {Script, console} from "forge-std/Script.sol";
import {NinjaNFTContarct} from "../src/NinjaNFTContarct.sol";

contract DeployScript is Script {
    function run() external {
        // Use environment variable if set, otherwise use Anvil default key
        uint256 deployerPrivateKey;
        try vm.envUint("PRIVATE_KEY") returns (uint256 key) {
            deployerPrivateKey = key;
        } catch {
            // Default Anvil private key for local testing
            deployerPrivateKey = 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80;
        }

        vm.startBroadcast(deployerPrivateKey);

        // Deployment parameters
        uint256 maxSupply = 10000; // Maximum total supply
        uint256 maxPerWallet = 10; // Maximum tokens per wallet
        string memory baseURI = "https://example.com/api/token/"; // Base URI

        // Deploy contract
        NinjaNFTContarct ninjaNft = new NinjaNFTContarct(
            maxSupply,
            maxPerWallet,
            baseURI
        );

        console.log("NinjaNFT deployed to:", address(ninjaNft));
        console.log("Deployer:", vm.addr(deployerPrivateKey));
        console.log("Max Supply:", maxSupply);
        console.log("Max Per Wallet:", maxPerWallet);
        console.log("Base URI:", baseURI);

        // Optional: auto-enable mint
        ninjaNft.setMintActive(true);
        console.log("Mint activated");

        vm.stopBroadcast();
    }
}
