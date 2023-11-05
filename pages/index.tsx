import type { NextPage } from "next";
import { useCallback, useEffect, useState } from "react";
import {
  Accordion,
  Button,
  Flex,
  Heading,
  Image,
  Tooltip,
  useColorMode,
  useToast,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import {
  useInitWeb3InboxClient,
  useManageSubscription,
  useW3iAccount,
} from "@web3inbox/widget-react";
import "@web3inbox/widget-react/dist/compiled.css";

import { useAccount, usePublicClient, useSignMessage } from "wagmi";
import { FaBell, FaBellSlash, FaPause, FaPlay } from "react-icons/fa";
import { BsSendFill } from "react-icons/bs";
import useSendNotification from "../utils/useSendNotification";
import { useInterval } from "usehooks-ts";
import Preferences from "../components/Preferences";
import Messages from "../components/Messages";
import Subscription from "../components/Subscription";
import { sendNotification } from "../utils/fetchNotify";
import Subscribers from "../components/Subscribers";

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID as string;
const appDomain = process.env.NEXT_PUBLIC_APP_DOMAIN as string;

const Home: NextPage = () => {
  /** Web3Inbox SDK hooks **/
  const isW3iInitialized = useInitWeb3InboxClient({
    projectId,
    domain: appDomain,
    isLimited: process.env.NODE_ENV == "production",
  });
  const {
    account,
    setAccount,
    register: registerIdentity,
    identityKey,
  } = useW3iAccount();
  const {
    subscribe,
    unsubscribe,
    isSubscribed,
    isSubscribing,
    isUnsubscribing,
  } = useManageSubscription(account);

  const { address } = useAccount({
    onDisconnect: () => {
      setAccount("");
    },
  });
  const { signMessageAsync } = useSignMessage();
  const wagmiPublicClient = usePublicClient();

  const { colorMode } = useColorMode();
  const toast = useToast();

  const { handleSendNotification, isSending } = useSendNotification();
  const [lastBlock, setLastBlock] = useState<string>();
  const [isBlockNotificationEnabled, setIsBlockNotificationEnabled] =
    useState(true);

  const signMessage = useCallback(
    async (message: string) => {
      const res = await signMessageAsync({
        message,
      });

      return res as string;
    },
    [signMessageAsync]
  );

  // We need to set the account as soon as the user is connected
  useEffect(() => {
    if (!Boolean(address)) return;
    setAccount(`eip155:1:${address}`);
  }, [signMessage, address, setAccount]);

  const handleRegistration = useCallback(async () => {
    if (!account) return;
    try {
      await registerIdentity(signMessage);
    } catch (registerIdentityError) {
      console.error({ registerIdentityError });
    }
  }, [signMessage, registerIdentity, account]);

  useEffect(() => {
    // register even if an identity key exists, to account for stale keys
    handleRegistration();
  }, [handleRegistration]);

  const handleSubscribe = useCallback(async () => {
    if(!identityKey) {
      await handleRegistration();
    }

    await subscribe();
  }, [subscribe, identityKey])

  // handleSendNotification will send a notification to the current user and includes error handling.
  // If you don't want to use this hook and want more flexibility, you can use sendNotification.
  // const handleTestNotification = useCallback(async () => {
  //   if (isSubscribed) {
  //     handleSendNotification({
  //       title: "GM Hacker",
  //       body: "yolo lfg!",
  //       icon: `${window.location.origin}/WalletConnect-blue.svg`,
  //       url: window.location.origin,        
  //       type: process.env.NEXT_PUBLIC_NOTIFICATION_TYPE || ""
  //     });
  //   }
  //     });
  //   }
  // }, [handleSendNotification, isSubscribed]);

  return (
    <Flex w="full" flexDirection={"column"} maxW="700px">
      <Image
        aria-label="WalletConnect"
        src="2themoon.jpeg"
        width={ isSubscribed ? "100px" : "300px" }
        height={ isSubscribed ? "100px" : "300px" }
        alignSelf="center"
        transition="width 0.3s, height 0.3s"
      />
      <Heading alignSelf={"center"} textAlign={"center"} mb={6}>
        To the Moon!
      </Heading>

      <Flex flexDirection="column" gap={4}>
        {!isSubscribed && (
          <Tooltip
            label={
              !Boolean(address)
                ? "Connect your wallet first."
                : "Register your account."
            }
            hidden={Boolean(account)}
          >
            <Button
              leftIcon={<FaBell />}
              onClick={handleSubscribe}
              colorScheme="green"
              rounded="full"
              // variant="outline"
              w="fit-content"
              alignSelf="center"
              isLoading={isSubscribing}
              loadingText="Subscribing..."
              isDisabled={!Boolean(address) || !Boolean(account)}
            >
              Subscribe
            </Button>
          </Tooltip>
        )}

        {  !isSubscribed && (
          <Alert status="success" borderRadius="md">
            <AlertIcon />
            
            <AlertDescription>
              Get ready to make it rain! Each message received will earn you ONE DOLLAR OF ETH 🙌 
            </AlertDescription>
          </Alert>
        )}

        { account ? '' : (
          <Alert status="info" borderRadius="md">
            <AlertIcon />
            
            <AlertDescription>
              FIRST CONNECT YOUR WALLET 
            </AlertDescription>
          </Alert>
        )}

        {isSubscribed && (
          <>
          <Messages />
          
          <Button
              leftIcon={<FaBell />}
              onClick={() => { unsubscribe() }}
              colorScheme="red"
              rounded="full"
              // variant="outline"
              w="fit-content"
              alignSelf="center"
              isLoading={isUnsubscribing}
              loadingText="Copping out..."
            >
              Fumble the bag
            </Button>
          
          </>
        )}
      </Flex>
    </Flex>
  );
};

export default Home;
