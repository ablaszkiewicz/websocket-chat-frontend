import { AttachmentIcon } from '@chakra-ui/icons';
import { Flex, Input, Button, IconButton } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import useGlobalKeyDown from 'react-global-key-down-hook';
import { useMessages } from '../../hooks/useMessages';
import { Message } from './MessageListItem';

export const InputPanel = () => {
  const [message, setMessage] = useState('');

  const { sendMessage, sendFile } = useMessages();
  const fileInput = useRef(null);

  useGlobalKeyDown(() => {
    sendMessage(message);
    setMessage('');
  }, ['Enter']);

  const uploadFile = (event: any) => {
    const file = event.target.files[0];
    const name = file.name.split('.')[0];
    const extension = file.name.split('.').pop();
    const mimeType = file.type;
    const reader = new FileReader();

    reader.readAsBinaryString(file);
    reader.onload = () => {
      console.log('Sending file: ', new TextEncoder().encode(reader.result as string).length);
      sendFile(reader.result as string, name, extension, mimeType);
    };
  };

  return (
    <Flex w={'100%'}>
      <Input type={'file'} onChange={uploadFile} d='none' ref={fileInput} />
      <IconButton
        onClick={() => (fileInput as any).current.click()}
        icon={<AttachmentIcon />}
        aria-label='attach file'
        mr={1}
        colorScheme={'cyan'}
      />
      <Input
        placeholder='Message...'
        mr={1}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        flexBasis={0}
        flexGrow={3}
        backgroundColor={'gray.800'}
      />
      <Button
        ml={1}
        flexShrink={0}
        onClick={() => {
          sendMessage(message);
          setMessage('');
        }}
        colorScheme={'cyan'}
      >
        Send
      </Button>
    </Flex>
  );
};
