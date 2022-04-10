import { Message, MessageListItem, TextMessage } from './MessageListItem';
import { VStack, Box, Text } from '@chakra-ui/react';
import React from 'react';
import { useMessages } from '../../hooks/useMessages';
import { SystemMessageListItem } from './SystemMessageListItem';
import { FileListItem, FileMessage } from './FileListItem';

export function MessagesPanel() {
  const { messages } = useMessages();
  return (
    <VStack
      w={'100%'}
      borderRadius={'5'}
      flexGrow={1}
      p={2}
      overflowY={'scroll'}
      css={scrollbarStyle}
      backgroundColor={'gray.900'}
      shadow={'inner'}
      spacing={1}
    >
      {messages.map((message, i) => {
        if (message.type && message.type === 'system')
          return <SystemMessageListItem key={i} message={(message as TextMessage).message} />;
        if (message.type && message.type === 'file-message')
          return (
            <FileListItem
              file={message as FileMessage}
              key={i}
              isFirstMessage={i > 0 && messages[i - 1].user === message.user ? false : true}
              isLastMessage={i < messages.length - 1 && messages[i + 1].user === message.user ? false : true}
            />
          );
        else
          return (
            <MessageListItem
              message={message as TextMessage}
              key={i}
              isFirstMessage={i > 0 && messages[i - 1].user === message.user ? false : true}
              isLastMessage={i < messages.length - 1 && messages[i + 1].user === message.user ? false : true}
            />
          );
      })}
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
