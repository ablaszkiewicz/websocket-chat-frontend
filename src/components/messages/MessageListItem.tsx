import { AttachmentIcon } from '@chakra-ui/icons';
import { Box, Center, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import { TextMessage } from '../../entities/TextMessage';
import { useStore } from '../../zustand/store';

interface Props {
  message: TextMessage;
  isFirstMessage: boolean;
  isLastMessage: boolean;
}

export const MessageListItem = (props: Props) => {
  const isMyMessage = props.message.user === useStore((store) => store.username);

  const vStackCSS = {
    display: '-webkit-box',
    '-webkit-box-orient': 'vertical',
    '-webkit-box-align': isMyMessage ? 'end' : 'start',
  };

  return (
    <VStack w={'100%'} css={vStackCSS} spacing={0}>
      {props.isFirstMessage && (
        <Text pl={1} fontSize={'xs'} mb={0.5}>
          {props.message.user}
        </Text>
      )}

      {!isMyMessage && (
        <Box
          key={props.message.user + props.message.message}
          p={1}
          px={2}
          backgroundColor={isMyMessage ? 'blue.500' : 'gray.600'}
          borderTopLeftRadius={props.isFirstMessage ? 5 : 2}
          borderTopRightRadius={5}
          borderBottomLeftRadius={props.isLastMessage ? 5 : 2}
          borderBottomRightRadius={5}
          maxW={'70%'}
        >
          <Text>{props.message.message}</Text>
        </Box>
      )}

      {isMyMessage && (
        <Box
          key={props.message.user + props.message.message}
          p={1}
          px={2}
          backgroundColor={isMyMessage ? 'blue.500' : 'gray.600'}
          borderTopLeftRadius={5}
          borderTopRightRadius={props.isFirstMessage ? 5 : 2}
          borderBottomLeftRadius={5}
          borderBottomRightRadius={props.isLastMessage ? 5 : 2}
          maxW={'70%'}
        >
          <Text>{props.message.message}</Text>
        </Box>
      )}
    </VStack>
  );
};

{
  /* <Text>
  <Center w={'3em'} h={'3em'} backgroundColor={'blue.300'} borderRadius={5} mt={1}>
    <AttachmentIcon mx={'auto'} />
  </Center>
  <Text fontSize={'xs'}>plik.zipplik.zipplik.zip</Text>
</Text>; */
}
