import { StatHelpText } from '@chakra-ui/react';
import axios from 'axios';
import { AES, enc } from 'crypto-js';
import { useEffect, useState } from 'react';
import { Socket, io } from 'socket.io-client';
import { StringMappingType } from 'typescript';
import { baseUrl } from '..';
import { FileMetaMessage, FilePartMessage } from '../entities/FileMessage';
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

    console.log('Connecting to WSS');

    setSocket(
      io(baseUrl, {
        transports: ['websocket'],
        transportOptions: {
          websocket: { extraHeaders: { Authorization: token } },
          polling: { extraHeaders: { Authorization: token } },
        },
        query: { token },
      })
    );
  }, [token]);

  useEffect(() => {
    if (!socket || !isMaster) return;

    console.log('Connected to socket!');

    socket.on('msgToClient', (encryptedMessage: string) => {
      onGetMessage(encryptedMessage);
    });
    socket.on('systemMsgToClient', (message: string) => {
      onGetSystemMessage(message);
    });
    socket.on('fileMetaToClient', (file: FileMetaMessage) => {
      onGetFile(file);
    });
    socket.on('unauthorized', () => {
      onUnauthorized();
    });

    return () => {
      console.log('Disconnected from socket!');
      socket.removeAllListeners();
      socket.offAny();
      socket.disconnect();
      socket.close();
    };
  }, [socket]);

  const onUnauthorized = () => {
    console.log('Failed to estabilish websocket connection. Invalid JWT token.');
  };

  const onGetMessage = (encryptedMessage: string) => {
    const decryptedBytes = AES.decrypt(encryptedMessage, 'secret');
    const decryptedText = decryptedBytes.toString(enc.Utf8);
    const message = JSON.parse(decryptedText) as Message;
    addMessage(message);
  };

  const sendMessage = (messageText: string) => {
    const message: TextMessage = { type: 'text-message', user: username, message: messageText };
    const stringified = JSON.stringify(message);
    const encrypted = AES.encrypt(stringified, 'secret').toString();
    socket.emit('msgToServer', encrypted);
  };

  const onGetSystemMessage = (messageText: string) => {
    const message: TextMessage = { type: 'system', message: messageText, user: 'system' };
    addMessage(message);
  };

  const onGetFile = (fileMessage: FileMetaMessage) => {
    addMessage(fileMessage);
  };

  const sendFileMeta = (name: string, extension: string, mimeType: string, partsCount: number) => {
    const fileMessage: FileMetaMessage = {
      type: 'file-message',
      user: username,
      name: name,
      extension: extension,
      mimeType: mimeType,
      partsCount: partsCount,
    };

    socket.emit('fileMetaToServer', fileMessage);
  };

  const sendFile = (buffer: string, name: string, currentPart: number) => {
    const fileMessage: FilePartMessage = {
      type: 'file-message',
      user: username,
      name: name,
      content: buffer,
      currentPart: currentPart,
    };

    const stringified = JSON.stringify(fileMessage);
    const encrypted = AES.encrypt(stringified, 'secret').toString();

    socket.emit('filePartToServer', encrypted);
  };

  return { messages, sendMessage, onGetSystemMessage, sendFile, sendFileMeta };
}
