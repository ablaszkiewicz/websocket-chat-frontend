import { AttachmentIcon } from '@chakra-ui/icons';
import { AspectRatio, Box, Center, Flex, Image, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useStore } from '../../zustand/store';
import { Message } from './MessageListItem';

export interface FileMessage extends Message {
  name: string;
  size: number;
  extension: string;
  content: Uint8Array;
  mimeType: string;
}

interface Props {
  file: FileMessage;
  isFirstMessage: boolean;
  isLastMessage: boolean;
}

export const FileListItem = (props: Props) => {
  const [blob, setBlob] = useState<Blob>();
  const isMyMessage = props.file.user === useStore((store) => store.username);

  const vStackCSS = {
    display: '-webkit-box',
    '-webkit-box-orient': 'vertical',
    '-webkit-box-align': isMyMessage ? 'end' : 'start',
  };

  useEffect(() => {
    console.log('Got file!');
    const blob = new Blob([props.file.content], { type: props.file.mimeType });
    setBlob(blob);
    console.log(URL.createObjectURL(blob));
  }, []);

  return (
    <VStack w={'100%'} css={vStackCSS} spacing={0}>
      {props.isFirstMessage && (
        <Text pl={1} fontSize={'xs'} mb={0.5}>
          {props.file.user}
        </Text>
      )}

      {!isMyMessage && (
        <Box
          key={props.file.user + props.file.name}
          p={1}
          px={2}
          backgroundColor={isMyMessage ? 'blue.500' : 'gray.600'}
          borderTopLeftRadius={props.isFirstMessage ? 5 : 2}
          borderTopRightRadius={5}
          borderBottomLeftRadius={props.isLastMessage ? 5 : 2}
          borderBottomRightRadius={5}
          maxW={'70%'}
        >
          <Flex backgroundColor={'blue.300'} borderRadius={5} mt={1}>
            {blob && <Image src={URL.createObjectURL(blob)} />}
          </Flex>

          <Text fontSize={'xs'}>
            {props.file.name}.{props.file.extension}
          </Text>
        </Box>
      )}

      {isMyMessage && (
        <Box
          key={props.file.user + props.file.name}
          p={1}
          px={2}
          backgroundColor={isMyMessage ? 'blue.500' : 'gray.600'}
          borderTopLeftRadius={5}
          borderTopRightRadius={props.isFirstMessage ? 5 : 2}
          borderBottomLeftRadius={5}
          borderBottomRightRadius={props.isLastMessage ? 5 : 2}
          maxW={'70%'}
        >
          <Flex backgroundColor={'blue.300'} borderRadius={5} mt={1}>
            {blob && <Image src={URL.createObjectURL(blob)} />}
          </Flex>

          <Text fontSize={'xs'}>
            {props.file.name}.{props.file.extension}
          </Text>
        </Box>
      )}
    </VStack>
  );
};

{
}
