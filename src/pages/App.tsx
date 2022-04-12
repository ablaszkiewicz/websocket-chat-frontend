import { InputPanel } from '../components/messages/InputPanel';
import { MessagesPanel } from '../components/messages/MessagesPanel';
import { Navbar } from '../components/Navbar';
import { ChakraProvider, Box, VStack, HStack, Flex } from '@chakra-ui/react';
import theme from '../theme';
import { useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '..';
import { useStore } from '../zustand/store';
import { RoomsPanel } from '../components/rooms/RoomsPanel';
import { SettingsHeader } from '../components/rooms/SettingsHeader';
import { useMessages } from '../hooks/useMessages';

export const App = () => {
  const setUsername = useStore((store) => store.setUsername);
  const setToken = useStore((store) => store.setToken);
  const { onGetSystemMessage } = useMessages({ isMaster: true });

  useEffect(() => {
    login();
  }, []);

  const login = async () => {
    const response = await axios.post(`${baseUrl}/auth/guest`);

    setUsername(response.data.username);
    setToken(response.data.token);
    onGetSystemMessage(`Connected as ${response.data.username}`);
  };
  return (
    <ChakraProvider theme={theme}>
      <Flex p={[1, 1, 5]} h={['80vh', '80vh', '100vh']} direction={'column'}>
        <Navbar />

        <Flex
          w={['100%', '100%', '60%', '50%']}
          borderRadius={'5'}
          mx={'auto'}
          mt={10}
          mb={[0, 0, 10]}
          p={2}
          gap={2}
          backgroundColor={'gray.700'}
          shadow={'dark-lg'}
          flexGrow={1}
          direction={['column', 'column', 'row']}
          overflow='hidden'
        >
          <VStack w={['100%', '100%', '30%']} h={['50%', '50%', '100%']} order={[0, 0, 0]}>
            <RoomsPanel />
            <SettingsHeader />
          </VStack>
          <VStack w={['100%', '100%', '70%']} h={['50%', '50%', '100%']}>
            <MessagesPanel />
            <InputPanel />
          </VStack>
        </Flex>
      </Flex>
    </ChakraProvider>
  );
};
