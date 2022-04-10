import { StatHelpText } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Socket, io } from 'socket.io-client';
import { StringMappingType } from 'typescript';
import { baseUrl } from '..';
import { FileMessage } from '../entities/FileMessage';
import { Message } from '../entities/Message';
import { TextMessage } from '../entities/TextMessage';
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

    socket.on('msgToClient', (message: TextMessage) => {
      onGetMessage(message);
    });
    socket.on('systemMsgToClient', (message: string) => {
      onGetSystemMessage(message);
    });
    socket.on('fileMetaToClient', (file: FileMessage) => {
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

  const sendFileMeta = (name: string, extension: string, mimeType: string, partsCount: number, currentPart: number) => {
    const fileMessage: FileMessage = {
      type: 'file-message',
      user: username,
      name: name,
      extension: extension,
      mimeType: mimeType,
      isMeta: true,
      partsCount: partsCount,
      currentPart: currentPart,
    };
    socket.emit('fileMetaToServer', fileMessage);
  };

  const sendFile = (
    buffer: string,
    name: string,
    extension: string,
    mimeType: string,
    partsCount: number,
    currentPart: number
  ) => {
    const fileMessage: FileMessage = {
      type: 'file-message',
      user: username,
      name: name,
      extension: extension,
      content: buffer,
      mimeType: mimeType,
      isMeta: false,
      partsCount: partsCount,
      currentPart: currentPart,
    };
    socket.emit('filePartToServer', fileMessage);
  };

  return { messages, sendMessage, onGetSystemMessage, sendFile, sendFileMeta };
}
