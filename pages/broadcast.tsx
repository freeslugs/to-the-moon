import type { NextPage } from "next";
import { Alert, AlertDescription, AlertIcon, AlertTitle, Flex, Heading, Input,
  FormControl, 
  FormLabel, 
  useColorModeValue,
  Button 
 } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { getAllSubscribers } from "../utils/fetchNotify";
import { useContractRead } from 'wagmi'
// import useSendNotification from "../utils/useSendNotification";
import { sendNotification } from "../utils/fetchNotify";
import { useAccount, usePublicClient, useSignMessage } from "wagmi";

import AppContract from '../artifacts/contracts/App.sol/App.json'
import Link from "next/link";
const AppABI = AppContract.abi

const BroadcastPage: NextPage = () => {
  const [subscribers, setSubscribers] = useState<string[]>();
  const [message, setMessage] = useState<string>("");
  // const { handleSendNotification, isSending } = useSendNotification();
  const { address } = useAccount()

  const getSubscribers = useCallback(async () => {
    try {
      const allSubscribers = await getAllSubscribers();
      setSubscribers(allSubscribers);
    } catch (getSubscribersError) {
      console.log({ getSubscribersError });
    }
  }, []);

  useEffect(() => {
    getSubscribers();
  }, [getSubscribers]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    sendNotification({
      accounts: subscribers || [],
      notification: {
        title: address || "from some anon",
        body: message,
        icon: `${window.location.origin}/2themoon.jpeg`,
        url: `https://testnet-zkevm.polygonscan.com/address/${address}`,
        type: process.env.NEXT_PUBLIC_NOTIFICATION_TYPE || ""
      }
    });

    console.log(message);
  };

  const { data: ethOracle, isError: ethOracleError, isLoading: ethOracleLoading } = useContractRead({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    chainId: 1442,
    abi: AppABI,
    functionName: 'ethOracle',
  })

  const { data: price, isError: priceError, isLoading: priceLoading } = useContractRead({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as `0x${string}`,
    chainId: 1442,
    abi: AppABI,
    functionName: 'getOracleValue',
    args: [ethOracle]
  })

  const pricePerSub = (10 ** 18) / Number(price) 

  return (
    <div>
      <Flex justifyContent="center">
        <Heading as="h2">Broadcast</Heading>
      </Flex>

      <Link href={`https://testnet-zkevm.polygonscan.com/address/${process.env.NEXT_PUBLIC_CONTRACT_ADDRESS}#code`}  target='_blank' rel='noopener noreferrer'>
      <Alert status="info" mt={4}>
        <AlertIcon />
        <AlertTitle suppressHydrationWarning>
          {/* 1 eth is {price ? '$' + (Number(price) / (10 ** 18)).toFixed(2) : '..'}. */}
          1 dolla is {price ? pricePerSub.toFixed(6) + ' eth': '..'}
        </AlertTitle>
        <AlertDescription> (powered by The Chronicle 🔒 ) </AlertDescription>
      </Alert>
      </Link>
      
      <Alert status="success" mt={4}>
        <AlertIcon />
        <AlertTitle>msging {subscribers ? subscribers.length : '..'} subs?</AlertTitle>
        <AlertDescription suppressHydrationWarning>
        that&apos;s gonna be {price && subscribers ? (pricePerSub * subscribers.length).toFixed(6): '..'} eth
        </AlertDescription>
      </Alert>


      <div style={{ marginTop: "2rem" }}></div>
      <FormControl bg={useColorModeValue("gray.200", "gray.700")} p={4} borderRadius="lg" style={{ marginTop: "2rem" }}>
        <FormLabel htmlFor="message">What&apos;s on your mind?</FormLabel>
        <form onSubmit={handleSubmit}>
          <Input id="message" type="text" bg="white" style={{ marginTop: "1rem" }} onChange={(e) => setMessage(e.target.value)} />
          <Button type="submit" colorScheme="teal" leftIcon={<span role="img" aria-label="send">✉️</span>} bg="teal.500" color="white" style={{ marginTop: "1rem" }}>Send</Button>
        </form>
      </FormControl>
    </div>
  );
}

export default BroadcastPage;

