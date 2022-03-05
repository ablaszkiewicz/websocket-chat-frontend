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
      />
      <Input
        placeholder='Message...'
        mr={2}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        flexBasis={0}
        flexGrow={3}
      />
      <Button ml={2} flexShrink={0} onClick={() => sendMessage({ user: user, message: message })}>
        Send
      </Button>
    </Flex>
  );
};
