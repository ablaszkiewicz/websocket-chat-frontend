import { AttachmentIcon } from '@chakra-ui/icons';
import { AspectRatio, Box, Center, Flex, Image, Progress, Text, VStack } from '@chakra-ui/react';
import { AES, enc } from 'crypto-js';
import { useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import { Socket } from 'socket.io-client';
import { FileMetaMessage, FilePartMessage } from '../../entities/FileMessage';
import { useStore } from '../../zustand/store';

interface Props {
  file: FileMetaMessage;
  isFirstMessage: boolean;
  isLastMessage: boolean;
}

export const FileListItem = (props: Props) => {
  const [isImage, setIsImage] = useState<boolean>(false);
  const [isVideo, setIsVideo] = useState<boolean>(false);
  const [blob, setBlob] = useState<Blob>();
  const [downloadCompleted, setDownloadCompleted] = useState<boolean>(false);
  const [downloadProgress, setDownloadProgress] = useState<number>(0);
  const [content, setContent] = useState<string>('');
  const isMyMessage = props.file.user === useStore((store) => store.username);
  const socket = useStore((store) => store.socket);

  const vStackCSS = {
    display: '-webkit-box',
    '-webkit-box-orient': 'vertical',
    '-webkit-box-align': isMyMessage ? 'end' : 'start',
  };

  useEffect(() => {
    socket.on('filePartToClient', (filePart: string) => {
      const decryptedBytes = AES.decrypt(filePart, 'secret');
      const decryptedText = decryptedBytes.toString(enc.Utf8);
      const file = JSON.parse(decryptedText) as FilePartMessage;

      setContent((oldContent) => oldContent + file.content);
      setDownloadProgress((file.currentPart / props.file.partsCount) * 100);
      if (file.currentPart === props.file.partsCount - 1) {
        setDownloadCompleted(true);
      }
    });

    return () => socket.off('filePartToClient');
  }, []);

  useEffect(() => {
    if (downloadCompleted) {
      const buffer = Uint8Array.from(content, (x) => x.charCodeAt(0));
      const blobTemp = new Blob([buffer], { type: props.file.mimeType });
      setBlob(blobTemp);

      if (props.file.mimeType.includes('image')) {
        setIsImage(true);
      }
      if (props.file.mimeType.includes('video')) {
        setIsVideo(true);
      }
      socket.off('filePartToClient');
    }
  }, [downloadCompleted]);

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
            {blob && isImage && <Image src={URL.createObjectURL(blob)} />}
            {blob && isVideo && (
              <ReactPlayer height={'auto'} width={'auto'} url={URL.createObjectURL(blob)} playing controls />
            )}
          </Flex>
          {!downloadCompleted && <Progress value={downloadProgress} />}

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
            {blob && isImage && <Image src={URL.createObjectURL(blob)} />}
            {blob && isVideo && (
              <ReactPlayer height={'auto'} width={'auto'} url={URL.createObjectURL(blob)} playing controls />
            )}
            {blob && !isImage && !isVideo && (
              <Center w={'100%'} h={'3em'} backgroundColor={'blue.300'} borderRadius={5} mt={1}>
                <AttachmentIcon mx={'auto'} />
              </Center>
            )}
          </Flex>
          {!downloadCompleted && <Progress value={downloadProgress} />}
          <Text fontSize={'xs'}>
            {props.file.name}.{props.file.extension}
          </Text>
        </Box>
      )}
    </VStack>
  );
};
