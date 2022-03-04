import { Box, Text } from '@chakra-ui/react';
import React from 'react';

export interface Message {
  user: string;
  message: string;
}

interface Props {
  message: Message;
}

export const MessageListItem = (props: Props) => {
  return (
    <Box
      key={props.message.user + props.message.message}
      w={'100%'}
      borderWidth={'1px'}
      p={1}
      borderRadius={'5'}
      backgroundColor={'gray.900'}
    >
      <Text>
        [{props.message.user}]: {props.message.message}
      </Text>
    </Box>
  );
};
