import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  CloseButton,
  Flex,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import { useMessages, useW3iAccount } from "@web3inbox/widget-react";
import Link from "next/link";
import React from "react";

function Messages() {
  const { account } = useW3iAccount();
  const { messages, deleteMessage } = useMessages(account);

  return (
    <>
      <Heading fontSize="lg" as="h2">Messages</Heading>
      <Box overflowY="scroll" position={"relative"} maxH="400px">
        {!messages?.length ? (
          <Alert status="info" borderRadius="md">
            <AlertIcon />
            <AlertDescription>
              📩 You don&apos;t have any messages yet, but don&apos;t worry! They&apos;ll be pouring in soon. Let&apos;s make it rain! 💸
            </AlertDescription>
          </Alert>
        ) : (
          messages
            .sort((a, b) => b.id - a.id)
            .map(({ id, message }) => (
              <Alert
                as={Link}
                href={message.url}
                target="_blank"
                key={id}
                status="info"
                colorScheme={message.type === "transactional" ? "blue" : "red"}
                rounded="xl"
                mb={4}
              >
                {/* <AlertIcon /> */}
                <Flex flexDir={"column"} flexGrow={1}>
                  <AlertTitle>{message.title}</AlertTitle>
                  <AlertDescription flexGrow={1}>
                    {message.body}
                  </AlertDescription>
                </Flex>
                <Flex w="60px" justifyContent="center">
                  <Image
                    src={message.icon}
                    alt="notification image"
                    height="60px"
                    rounded="full"
                    alignSelf="center"
                  />
                </Flex>
                {/* <CloseButton
                  alignSelf="flex-start"
                  position="relative"
                  right={-1}
                  top={-1}
                  onClick={async (e) => {
                    e.preventDefault();
                    deleteMessage(id);
                  }}
                /> */}
              </Alert>
            ))
        )}
      </Box>
    </>
  );
}

export default Messages;

