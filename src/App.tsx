import { ChakraProvider, Box, VStack, Flex, Heading, Spacer, Button, Input, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import theme from './theme';

export const App = () => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);
  const [socket, setSocket] = useState<Socket>();

  useEffect(() => {
    const socketTemp = io('https://wschatserv.bieda.it');
    setSocket(socketTemp);

    socketTemp.on('msgToClient', (messageTemp) => {
      addMessage(messageTemp);
    });

    document.addEventListener('keydown', handleKeyDown);
  }, []);

  const addMessage = (text: string) => {
    setMessages((messages) => [...messages, text]);
  };

  const sendMessage = () => {
    socket?.emit('msgToServer', message);
  };

  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <ChakraProvider theme={theme}>
      <Box p={5} minH='100vh'>
        <Flex>
          <Heading>Chat</Heading>
          <Spacer />
          <ColorModeSwitcher justifySelf='flex-end' />
        </Flex>

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
          <VStack
            w={'100%'}
            borderWidth={'1px'}
            borderRadius={'5'}
            flexGrow={1}
            p={2}
            overflowY={'scroll'}
            css={scrollbarStyle}
          >
            {messages.map((message, id) => (
              <Box key={id} w={'100%'} borderWidth={'1px'} p={1} borderRadius={'5'} backgroundColor={'gray.900'}>
                <Text>{message}</Text>
              </Box>
            ))}
          </VStack>
          <Flex w={'100%'}>
            <Input
              placeholder='Message...'
              mr={2}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyDown}
            />
            <Button ml={2} flexShrink={0} onClick={sendMessage}>
              Send
            </Button>
          </Flex>
        </VStack>
      </Box>
    </ChakraProvider>
  );
};

const scrollbarStyle = {
  '&::-webkit-scrollbar': {
    width: '4px',
  },
  '&::-webkit-scrollbar-track': {
    width: '6px',
  },
  '&::-webkit-scrollbar-thumb': {
    background: 'gray',
    borderRadius: '24px',
  },
};
