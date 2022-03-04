import { ChakraProvider, Box, VStack, theme, Flex, Heading, Spacer, Button, Input, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { ColorModeSwitcher } from './ColorModeSwitcher';

export const App = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    const socketTemp = io('http://wschatserv.bieda.it');
    setSocket(socketTemp);

    socketTemp.on('msgToClient', (messageTemp) => {
      addMessage(messageTemp);
    });
  }, []);

  const addMessage = (text: string) => {
    setMessages((messages) => [...messages, text]);
  };

  const sendMessage = () => {
    socket?.emit('msgToServer', message);
  };

  return (
    <ChakraProvider theme={theme}>
      <Box p={5} minH='100vh'>
        <Flex>
          <Heading>Chat</Heading>
          <Spacer />
          <ColorModeSwitcher justifySelf='flex-end' />
        </Flex>

        <VStack w={'40%'} h={'30em'} borderWidth={'3px'} borderRadius={'5'} mx={'auto'} mt={10} p={2} gap={1}>
          <VStack w={'100%'} borderWidth={'1px'} borderRadius={'5'} flexGrow={1} p={2}>
            {messages.map((message, id) => (
              <Box key={id} w={'100%'} borderWidth={'1px'} p={1} borderRadius={'5'} backgroundColor={'gray.900'}>
                <Text>{message}</Text>
              </Box>
            ))}
          </VStack>
          <Flex w={'100%'}>
            <Input placeholder='Message...' mr={2} value={message} onChange={(e) => setMessage(e.target.value)} />
            <Button ml={2} flexShrink={0} onClick={sendMessage}>
              Send
            </Button>
          </Flex>
        </VStack>
      </Box>
    </ChakraProvider>
  );
};
