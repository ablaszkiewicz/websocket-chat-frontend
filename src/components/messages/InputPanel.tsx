import { AttachmentIcon } from '@chakra-ui/icons';
import { Flex, Input, Button, IconButton } from '@chakra-ui/react';
import { AES } from 'crypto-js';
import React, { useEffect, useRef, useState } from 'react';
import useGlobalKeyDown from 'react-global-key-down-hook';
import { useMessages } from '../../hooks/useMessages';
import { readFile } from '../../other/FileUploader';
import { splitStringIntoChunks } from '../../other/Splitter';

export const InputPanel = () => {
  const [message, setMessage] = useState('');

  const { sendMessage, sendFileMeta, sendFilePart } = useMessages();
  const fileInput = useRef(null);

  useGlobalKeyDown(() => {
    sendMessage(message);
    setMessage('');
  }, ['Enter']);

  const uploadFile = async (event: any) => {
    const file = event.target.files[0];
    const name = file.name.split('.')[0];
    const extension = file.name.split('.').pop();
    const mimeType = file.type;

    const chunks = await readFile(file);

    sendFileMeta(name, extension, mimeType, chunks.length);

    for (let i = 0; i < chunks.length; i++) {
      sendFilePart(chunks[i], name, i);
    }
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
