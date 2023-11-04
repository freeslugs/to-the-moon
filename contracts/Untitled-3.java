// Mock contract that overrides and returns the eth value in the read method
contract EthOracleMock is IChronicle {
    uint private _ethValue;

    constructor(uint ethValue) {
        _ethValue = ethValue;
    }

    function read() external view override returns (uint value) {
        return _ethValue;
    }
}

