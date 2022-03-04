import { Message, MessageListItem } from './MessageListItem';
import { VStack, Box, Text } from '@chakra-ui/react';
import React from 'react';

interface Props {
  messages: Message[];
}

export function MessagesPanel(props: Props) {
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
      {props.messages.map((message, i) => (
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
