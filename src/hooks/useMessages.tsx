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
  const socket: Socket = useStore((store) => store.socket) as any;
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

    socket.on('msgToClient', (message: string) => {
      onGetMessage(message);
    });
    socket.on('unauthorized', (message: string) => {
      onUnauthorized();
    });

    return () => {
      socket.removeAllListeners();
    };
  }, [socket]);

  const onUnauthorized = () => {
    console.log('Failed to estabilish websocket connection. Invalid JWT token.');
  };

  const onGetMessage = (messageString: string) => {
    const message: Message = JSON.parse(messageString);
    addMessage(message);
  };

  const sendMessage = (messageText: string) => {
    const message: Message = { user: username, message: messageText };
    socket.emit('msgToServer', JSON.stringify(message));
  };

  const sendSystemMessage = (message: Message) => {
    addMessage(message);
  };

  return { messages, sendMessage, sendSystemMessage };
}
