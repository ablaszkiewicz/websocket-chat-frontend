import { Flex, Input, Button } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import useGlobalKeyDown from 'react-global-key-down-hook';
import { useMessages } from '../hooks/useMessages';
import { Message } from './MessageListItem';

export const InputPanel = () => {
  const [user, setUser] = useState('');
  const [message, setMessage] = useState('');

  const { sendMessage } = useMessages();

  useGlobalKeyDown(() => {
    sendMessage({ user: user, message: message });
    setMessage('');
  }, ['Enter']);

  return (
    <Flex w={'100%'}>
      <Input
        placeholder='Name...'
        mr={2}
        value={user}
        onChange={(e) => setUser(e.target.value)}
        flexBasis={0}
        flexGrow={1}
        backgroundColor={'gray.800'}
      />
      <Input
        placeholder='Message...'
        mr={1}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        flexBasis={0}
        flexGrow={3}
        backgroundColor={'gray.800'}
      />
      <Button
        ml={1}
        flexShrink={0}
        onClick={() => {
          sendMessage({ user: user, message: message });
          setMessage('');
        }}
        backgroundColor={'blue.500'}
      >
        Send
      </Button>
    </Flex>
  );
};
