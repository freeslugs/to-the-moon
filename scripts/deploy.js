// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  // const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  // const unlockTime = currentTimestampInSeconds + 60;

  // const lockedAmount = hre.ethers.parseEther("0.001");

  // const lock = await hre.ethers.deployContract("Lock", [unlockTime], {
  //   value: lockedAmount,
  // });

  // await lock.waitForDeployment();

  // console.log(
  //   `Lock with ${ethers.formatEther(
  //     lockedAmount
  //   )}ETH and unlock timestamp ${unlockTime} deployed to ${lock.target}`
  // );

  const app = await hre.ethers.deployContract("App", ['0x0Dcc19657007713483A5cA76e6A7bbe5f56EA37d']);

  await app.waitForDeployment();

  console.log(`App deployed to ${app.target}`);

  console.log(`Verifying contract on Etherscan...`);

  await run(`verify:verify`, {
    address: app.address,
    constructorArguments: ['0x0Dcc19657007713483A5cA76e6A7bbe5f56EA37d'],
  });


    // self kisser on zk evm testnet 
  // https://testnet-zkevm.polygonscan.com/address/0x0Dcc19657007713483A5cA76e6A7bbe5f56EA37d#writeContract

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
