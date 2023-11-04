// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "./SelfKisser.sol";
import "./IChronicle.sol";

contract App {
    address public owner;
    uint256 public ethUsdcPrice;
    ISelfKisser public selfKisser;

    constructor(address selfKisserAddress) {
        owner = msg.sender;
        selfKisser = ISelfKisser(selfKisserAddress);
    }

    function setEthUsdcPrice(uint256 price) public {
        require(msg.sender == owner, "You are not the owner");
        ethUsdcPrice = price;
    }

    function kissMe(address oracle) public {
        selfKisser.selfKiss(oracle);
    }
    
    function getOracleValue(address oracle) public view returns (uint256) {
        IChronicle chronicle = IChronicle(oracle);
        return chronicle.read();
    }

    function destroy() public {
        require(msg.sender == owner, "You are not the owner");
        selfdestruct(payable(owner));
    }
}

