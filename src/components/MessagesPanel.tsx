import { VStack, Box, Text } from '@chakra-ui/react';
import React from 'react';

interface Props {
  messages: string[];
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
      {props.messages.map((message, id) => (
        <Box key={id} w={'100%'} borderWidth={'1px'} p={1} borderRadius={'5'} backgroundColor={'gray.900'}>
          <Text>{message}</Text>
        </Box>
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
