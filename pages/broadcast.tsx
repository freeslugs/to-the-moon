import type { NextPage } from "next";
import { Alert, AlertDescription, AlertIcon, AlertTitle, Flex, Heading, Input,
  FormControl, 
  FormLabel, 
  
  Button 
 } from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { getAllSubscribers } from "../utils/fetchNotify";

const BroadcastPage: NextPage = () => {
  const [subscribers, setSubscribers] = useState<string[]>();
  const [message, setMessage] = useState<string>("");

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
    console.log(message);
  };

  return (
    <div>
      <Flex justifyContent="center">
        <Heading as="h2">Broadcast</Heading>
      </Flex>
      
      <Alert status="success" mt={4}>
        <AlertIcon />
        <AlertTitle>We have {subscribers ? subscribers.length : '..'} subscribers!</AlertTitle>

        

        <AlertDescription>
          Get ready to broadcast your message!
        </AlertDescription>
      </Alert>
      
      <div style={{ marginTop: "2rem" }}></div>
      <FormControl bg="gray.200" p={4} borderRadius="lg" style={{ marginTop: "2rem" }}>
        <FormLabel htmlFor="message">What's on your mind?</FormLabel>
        <form onSubmit={handleSubmit}>
          <Input id="message" type="text" bg="white" style={{ marginTop: "1rem" }} onChange={(e) => setMessage(e.target.value)} />
          <Button type="submit" colorScheme="teal" leftIcon={<span role="img" aria-label="send">✉️</span>} bg="teal.500" color="white" style={{ marginTop: "1rem" }}>Send</Button>
        </form>
      </FormControl>
    </div>
  );
}

export default BroadcastPage;

