// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./SelfKisser.sol";
import "./IChronicle.sol";

import "hardhat/console.sol";

contract App {
    address public owner;
    ISelfKisser public selfKisser;
    IChronicle public ethOracle;

    constructor(address selfKisserAddress, address ethOracleAddress) {
        owner = msg.sender;
        selfKisser = ISelfKisser(selfKisserAddress);
        ethOracle = IChronicle(ethOracleAddress);
        selfKisser.selfKiss(ethOracleAddress);
    }

    function kissMe(address oracle) public {
        selfKisser.selfKiss(oracle);
    }
    
    function getOracleValue(address oracle) public view returns (uint256) {
        IChronicle chronicle = IChronicle(oracle);
        return chronicle.read();
    }

    function broadcast(address[] memory addresses) public payable {
        uint256 ethPrice = ethOracle.read();
        uint256 ethAmount = 1 ether / (ethPrice / 10 ** 18);

        require(msg.value >= ethAmount * addresses.length, "Insufficient payment");
        
        for (uint256 i = 0; i < addresses.length; i++) {
            payable(addresses[i]).transfer(ethAmount);
        }
    }

    function withdraw() public {
        require(msg.sender == owner, "You are not the owner");
        payable(owner).transfer(address(this).balance);
    }
}
