import { InputPanel } from '../components/InputPanel';
import { MessagesPanel } from '../components/MessagesPanel';
import { Navbar } from '../components/Navbar';
import { ChakraProvider, Box, VStack, Flex, Heading, Spacer, Button, Input, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import theme from '../theme';
import { Message } from '../components/MessageListItem';

export const App = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  //const [socket] = useState<Socket>(io('https://wschatserv.bieda.it', { transports: ['polling'] }));
  const [socket] = useState<Socket>(io('http://localhost:3001', { transports: ['polling'] }));

  useEffect(() => {
    socket.on('msgToClient', (messageTemp) => {
      appendMessage(messageTemp);
    });
  }, []);

  const appendMessage = (payload: string) => {
    const msg: Message = JSON.parse(payload);
    setMessages((old) => [...old, msg]);
  };

  const sendMessage = (message: Message) => {
    socket.emit('msgToServer', JSON.stringify(message));
  };

  return (
    <ChakraProvider theme={theme}>
      <Box p={5} minH='100vh'>
        <Navbar />

        <VStack
          w={['100%', '80%', '60%', '40%']}
          h={'30em'}
          borderWidth={'3px'}
          borderRadius={'5'}
          mx={'auto'}
          mt={10}
          p={2}
          gap={1}
        >
          <MessagesPanel messages={messages} />
          <InputPanel sendMessage={sendMessage} />
        </VStack>
      </Box>
    </ChakraProvider>
  );
};
