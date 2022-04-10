import { StatHelpText } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Socket, io } from 'socket.io-client';
import { StringMappingType } from 'typescript';
import { baseUrl } from '..';
import { FileMessage } from '../components/messages/FileListItem';
import { Message, TextMessage } from '../components/messages/MessageListItem';
import { useStore } from '../zustand/store';

interface Props {
  isMaster?: boolean;
}

export function useMessages({ isMaster = false }: Props = {}) {
  const messages = useStore((store) => store.messages);
  const addMessage = useStore((store) => store.addMessage);
  const socket: Socket = useStore((store) => store.socket);
  const setSocket = useStore((store) => store.setSocket);
  const username = useStore((store) => store.username);
  const token = useStore((store) => store.token);

  useEffect(() => {
    if (!token || socket || !isMaster) return;

    setSocket(
      io(baseUrl, {
        transports: ['polling'],
        transportOptions: { polling: { extraHeaders: { Authorization: token } } },
      })
    );
  }, [token]);

  useEffect(() => {
    if (!socket || !isMaster) return;

    socket.on('msgToClient', (message: Message) => {
      onGetMessage(message);
    });
    socket.on('systemMsgToClient', (message: string) => {
      onGetSystemMessage(message);
    });
    socket.on('fileToClient', (file: FileMessage) => {
      onGetFile(file);
    });
    socket.on('unauthorized', () => {
      onUnauthorized();
    });

    return () => {
      socket.removeAllListeners();
    };
  }, [socket]);

  const onUnauthorized = () => {
    console.log('Failed to estabilish websocket connection. Invalid JWT token.');
  };

  const onGetMessage = (messageString: Message) => {
    addMessage(messageString);
  };

  const sendMessage = (messageText: string) => {
    const message: TextMessage = { type: 'text-message', user: username, message: messageText };
    socket.emit('msgToServer', message);
  };

  const onGetSystemMessage = (messageText: string) => {
    const message: TextMessage = { type: 'system', message: messageText, user: 'system' };
    addMessage(message);
  };

  const onGetFile = (fileMessage: FileMessage) => {
    addMessage(fileMessage);
  };

  const sendFile = (buffer: string | Uint8Array, name: string, extension: string, mimeType: string) => {
    const fileMessage: FileMessage = {
      type: 'file-message',
      user: username,
      name: name,
      extension: extension,
      size: buffer.length,
      content: buffer,
      mimeType: mimeType,
    };
    socket.emit('fileToServer', fileMessage);
  };

  return { messages, sendMessage, onGetSystemMessage, sendFile };
}
