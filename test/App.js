const {
time,
loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");


describe("App", function () {

it("should broadcast a message to all addresses", async () => {
    
    // Contracts are deployed using the first signer/account by default
    const [owner, address1, address2, address3] = await ethers.getSigners();
    const addresses =  [address1.address, address2.address, address3.address]
    
    for (const address of addresses) {
        // expect(await ethers.provider.getBalance(address)).to.equal(ethAmount);
        let balance = await ethers.provider.getBalance(address)
        // console.log(balance.toString())
    }
    // Mock the oracles
    const ethOracleMock = await ethers.getContractFactory("IChronicleMock");
    const ethOracle = await ethOracleMock.deploy();
    
    const selfKisserMock = await ethers.getContractFactory("SelfKisserMock");
    const selfKisser = await selfKisserMock.deploy();
    
    const App = await ethers.getContractFactory("App");
    const app = await App.deploy(selfKisser.target, ethOracle.target)

    
    const expectedValue = "1800000000000000000000"
    // console.log(`expected Vaue: ${expectedValue.toString()}`)
    const oracleValue = await app.getOracleValue(ethOracle.target);
    expect(oracleValue).to.equal(expectedValue);

    const ethAmount = 1 / 1800000000000000000000;
    console.log(ethAmount)
    
    await app.broadcast(addresses, { value: ethers.parseEther("0.002") });

    // Assert
    for (const address of addresses) {
        // expect(await ethers.provider.getBalance(address)).to.equal(ethAmount);
        // console.log(await ethers.provider.getBalance(address))
    }
});


})