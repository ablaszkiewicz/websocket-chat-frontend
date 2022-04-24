import { InputPanel } from '../components/messages/InputPanel';
import { MessagesPanel } from '../components/messages/MessagesPanel';
import { Navbar } from '../components/Navbar';
import { ChakraProvider, Box, VStack, HStack, Flex, Collapse, useDisclosure, Button } from '@chakra-ui/react';
import theme from '../theme';
import { useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '..';
import { useStore } from '../zustand/store';
import { RoomsPanel } from '../components/rooms/RoomsPanel';
import { SettingsHeader } from '../components/rooms/SettingsHeader';
import { useMessages } from '../hooks/useMessages';
import { useAuth } from '../hooks/useAuth';
import { use100vh } from 'react-div-100vh';

export const App = () => {
  const { loginAsGuest } = useAuth();
  useMessages({ isMaster: true });
  const fullHeight = use100vh();

  useEffect(() => {
    loginAsGuest();
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <Flex p={[0, 0, 5]} h={[fullHeight, fullHeight, '100vh']} direction={'column'}>
        <Navbar />

        <Flex
          w={['100%', '100%', '60%', '50%']}
          borderRadius={'5'}
          mx={'auto'}
          mt={[0, 0, 10]}
          p={2}
          gap={2}
          backgroundColor={'gray.700'}
          shadow={'dark-lg'}
          flexGrow={1}
          direction={['column', 'column', 'row']}
          overflow='hidden'
          mb={[0, 0, 10]}
        >
          <VStack w={['100%', '100%', '30%']}>
            <RoomsPanel />
            <SettingsHeader />
          </VStack>
          <VStack w={['100%', '100%', '70%']} flexGrow={1} overflow={'hidden'}>
            <MessagesPanel />
            <InputPanel />
          </VStack>
        </Flex>
      </Flex>
    </ChakraProvider>
  );
};
