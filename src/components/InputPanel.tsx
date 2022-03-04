import { Flex, Input, Button } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import useGlobalKeyDown from 'react-global-key-down-hook';
import { Message } from './MessageListItem';

interface Props {
  sendMessage: (message: Message) => void;
}

export const InputPanel = (props: Props) => {
  const [user, setUser] = useState('');
  const [message, setMessage] = useState('');

  useGlobalKeyDown(() => {
    props.sendMessage({ user: user, message: message });
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
      <Button ml={2} flexShrink={0} onClick={() => props.sendMessage({ user: user, message: message })}>
        Send
      </Button>
    </Flex>
  );
};
