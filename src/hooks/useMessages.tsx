import { StatHelpText } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Socket, io } from 'socket.io-client';
import { baseUrl } from '..';
import { Message } from '../components/messages/MessageListItem';
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
      sendSystemMessage(message);
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
    const message: Message = { user: username, message: messageText };
    socket.emit('msgToServer', message);
  };

  const sendSystemMessage = (messageText: string) => {
    const message: Message = { type: 'system', message: messageText, user: 'system' };
    addMessage(message);
  };

  return { messages, sendMessage, sendSystemMessage };
}
