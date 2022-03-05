import { Box, Text, VStack } from '@chakra-ui/react';
import React from 'react';

export interface Message {
  user: string;
  message: string;
}

interface Props {
  message: Message;
  displayUser: boolean;
}

export const MessageListItem = (props: Props) => {
  return (
    <VStack w={'100%'} align={'baseline'} spacing={0}>
      {props.displayUser && (
        <Text pl={1} fontSize={'xs'}>
          {props.message.user}
        </Text>
      )}

      <Box
        key={props.message.user + props.message.message}
        w={'100%'}
        borderWidth={'1px'}
        p={1}
        borderRadius={'5'}
        backgroundColor={'gray.900'}
      >
        <Text>{props.message.message}</Text>
      </Box>
    </VStack>
  );
};
