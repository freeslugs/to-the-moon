import type { AppProps } from "next/app";
import { ChakraProvider, Box, Flex, Grid, GridItem } from "@chakra-ui/react";
import { WagmiConfig, configureChains } from "wagmi";
import { polygonZkEvmTestnet } from "wagmi/chains";
import { theme } from "../styles/theme";
import Footer from "../components/core/Footer";
import "@web3inbox/widget-react/dist/compiled.css";

import { createWeb3Modal, defaultWagmiConfig } from "@web3modal/wagmi/react";
import Navbar from "../components/core/Navbar";

// 1. Get projectID at https://cloud.walletconnect.com
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID as string;
if (!projectId) {
  throw new Error("You need to provide NEXT_PUBLIC_PROJECT_ID env variable");
}

import { jsonRpcProvider } from '@wagmi/core/providers/jsonRpc'

 const polygonZkEvmTestnetBackup: any =  {
  id: 1442,
  name: 'Polygon zkEVM Testnet',
  network: 'polygon-zkevm-testnet',
  nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
  rpcUrls: {
    default: {
      http: ['https://rpc.public.zkevm-test.net'],
    },
    public: {
      http: ['https://rpc.public.zkevm-test.net'],
    },
  },
  blockExplorers: {
    blockscout: {
      name: 'Blockscout',
      url: 'https://explorer.public.zkevm-test.net',
    },
    default: {
      name: 'PolygonScan',
      url: 'https://testnet-zkevm.polygonscan.com',
    },
  },
  testnet: true,
  contracts: {
    multicall3: {
      address: '0xca11bde05977b3631167028862be2a173976ca11',
      blockCreated: 525686,
    },
  },
}


// // 2. Configure Web3Modal
const chains = [polygonZkEvmTestnet];
// const chains: any = [
//   jsonRpcProvider(polygonZkEvmTestnetBackup)
// ]
// const { chains, publicClient } = configureChains(
//   [polygonZkEvmTestnet],
//   [
//     jsonRpcProvider({
//       rpc: (chain) => ({
//         http: `https://${chain.id}.example.com`,
//       }),
//     }),
//   ],
// )

const wagmiConfig = defaultWagmiConfig({
  chains,
  projectId,
  // appName: "to the moon",
});

createWeb3Modal({ wagmiConfig, projectId, chains });

// import Confetti from "../components/confetti";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ChakraProvider theme={theme}>
        <WagmiConfig config={wagmiConfig}>
          <Grid
            templateAreas={`"header" "main" "footer"`}
            w="100%"
            width="100%"
            gridTemplateRows={"100px 3f 40px"}
            gridTemplateColumns={"1fr"}
            paddingY="2em"
          >
            <GridItem area={"header"} padding={4}>
              <Navbar />
            </GridItem>
            <GridItem area={"main"} padding={10}>
              <Flex
                flexDirection={"column"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <Component {...pageProps} />
              </Flex>
            </GridItem>
            <GridItem area={"footer"}>
              {/* <Footer /> */}
            </GridItem>
          </Grid>
        </WagmiConfig>
      </ChakraProvider>
    </>
  );
}

export default MyApp;
