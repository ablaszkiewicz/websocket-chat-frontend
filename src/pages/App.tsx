import { InputPanel } from '../components/InputPanel';
import { MessagesPanel } from '../components/MessagesPanel';
import { Navbar } from '../components/Navbar';
import { ChakraProvider, Box, VStack } from '@chakra-ui/react';
import theme from '../theme';
import { useEffect } from 'react';
import axios from 'axios';
import { baseUrl } from '..';
import { useStore } from '../zustand/store';

export const App = () => {
  const setUsername = useStore((store) => store.setUsername);
  const setToken = useStore((store) => store.setToken);

  useEffect(() => {
    login();
  });

  const login = async () => {
    const response = await axios.post(`${baseUrl}/auth/guest`);
    setUsername(response.data.username);
    setToken(response.data.token);
  };
  return (
    <ChakraProvider theme={theme}>
      <Box p={5} minH='100vh'>
        <Navbar />

        <VStack
          w={['100%', '80%', '60%', '40%']}
          h={'60vh'}
          borderRadius={'5'}
          mx={'auto'}
          mt={10}
          p={2}
          gap={0}
          backgroundColor={'gray.700'}
          shadow={'dark-lg'}
        >
          <MessagesPanel />
          <InputPanel />
        </VStack>
      </Box>
    </ChakraProvider>
  );
};
