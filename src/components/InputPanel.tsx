import { Flex, Input, Button } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import useGlobalKeyDown from 'react-global-key-down-hook';

interface Props {
  sendMessage: (message: string) => void;
}

export const InputPanel = (props: Props) => {
  const [message, setMessage] = useState('');

  useGlobalKeyDown(() => {
    props.sendMessage(message);
  }, ['Enter']);

  return (
    <Flex w={'100%'}>
      <Input placeholder='Message...' mr={2} value={message} onChange={(e) => setMessage(e.target.value)} />
      <Button ml={2} flexShrink={0} onClick={() => props.sendMessage(message)}>
        Send
      </Button>
    </Flex>
  );
};
