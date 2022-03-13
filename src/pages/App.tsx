import { InputPanel } from '../components/messages/InputPanel';
import { MessagesPanel } from '../components/messages/MessagesPanel';
import { Navbar } from '../components/Navbar';
import { ChakraProvider, Box, VStack, HStack } from '@chakra-ui/react';
import theme from '../theme';
import { useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '..';
import { useStore } from '../zustand/store';
import { RoomsPanel } from '../components/rooms/RoomsPanel';
import { SettingsHeader } from '../components/messages/SettingsHeader';
import { useMessages } from '../hooks/useMessages';

export const App = () => {
  const setUsername = useStore((store) => store.setUsername);
  const setToken = useStore((store) => store.setToken);
  const { sendSystemMessage } = useMessages({ isMaster: true });

  useEffect(() => {
    login();
  }, []);

  const login = async () => {
    const response = await axios.post(`${baseUrl}/auth/guest`);
    setUsername(response.data.username);
    setToken(response.data.token);
    sendSystemMessage(`Connected as ${response.data.username}`);
  };
  return (
    <ChakraProvider theme={theme}>
      <Box p={5} minH='100vh'>
        <Navbar />

        <HStack
          w={['100%', '80%', '60%', '50%']}
          h={'70vh'}
          borderRadius={'5'}
          mx={'auto'}
          mt={10}
          p={2}
          gap={0}
          backgroundColor={'gray.700'}
          shadow={'dark-lg'}
        >
          <VStack w={'30%'} h={'100%'}>
            <RoomsPanel />
            <SettingsHeader />
          </VStack>
          <VStack w={'70%'} h={'100%'}>
            <MessagesPanel />
            <InputPanel />
          </VStack>
        </HStack>
      </Box>
    </ChakraProvider>
  );
};
