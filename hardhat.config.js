require("@nomicfoundation/hardhat-toolbox");

const privateKey = process.env.PRIVATE_KEY
if (!privateKey) {
  throw new Error("Private key is empty.");
}

module.exports = {
  solidity: "0.8.19",
  networks: {
    polygonMumbai: {
      url: 'https://rpc-mumbai.maticvigil.com',
      chainId: 80001,
      accounts: [privateKey],
      explorer: 'https://mumbai.polygonscan.com/'
    },
    mumbai: {
      url: `https://polygon-mumbai-bor.publicnode.com`,
      accounts: [privateKey],
    },
    polygonZkEVM: {
      url: 'https://zkevm-rpc.com',
      chainId: 1101,
      explorer: 'https://zkevm.polygonscan.com/',
      accounts: [privateKey],
      // currency: 'ETH'
    },
    zkEVMTestnet: {
      url: 'https://rpc.public.zkevm-test.net',
      chainId: 1442,
      explorer: 'https://testnet-zkevm.polygonscan.com',
      // currency: 'ETH'
      accounts: [privateKey],
    }
  },
  etherscan: {
    // url: "https://mumbai.polygonscan.com",
    apiKey: {
      polygonMumbai: "81AUP55BNPFFZ3D27AEXXMYDM88FKFJCN3",
      mumbai: "81AUP55BNPFFZ3D27AEXXMYDM88FKFJCN3",
      polygonZkEVM: "QAUWRPIA4FWCZENN81TT9AJ8MQGJEGTDFI",
      zkEVMTestnet: "QAUWRPIA4FWCZENN81TT9AJ8MQGJEGTDFI",
    },
    customChains: [
      {
        network: "zkEVMTestnet",
        chainId: 1442,
        urls: {
          apiURL: "https://api-testnet-zkevm.polygonscan.com/api",
          browserURL: "https://testnet-zkevm.polygonscan.com"
        }
      }
    ]
  }  
};
