import { Message, MessageListItem } from './MessageListItem';
import { VStack, Box, Text } from '@chakra-ui/react';
import React from 'react';
import { useMessages } from '../hooks/useMessages';

export function MessagesPanel() {
  const { messages } = useMessages();
  return (
    <VStack
      w={'100%'}
      borderWidth={'1px'}
      borderRadius={'5'}
      flexGrow={1}
      p={2}
      overflowY={'scroll'}
      css={scrollbarStyle}
    >
      {messages.map((message, i) => (
        <MessageListItem message={message} key={i} />
      ))}
    </VStack>
  );
}

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
