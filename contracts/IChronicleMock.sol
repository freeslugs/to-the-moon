// SPDX-License-Identifier: MIT 

// Mock contract that overrides and returns the eth value in the read method
contract IChronicleMock {
    function read() external pure returns (uint value) {
        return 1800 * 10**18;
    }
}