import axios from 'axios';
import { useEffect, useState } from 'react';
import { Socket, io } from 'socket.io-client';
import { baseUrl } from '..';
import { Message } from '../components/MessageListItem';
import { useStore } from '../zustand/store';

export function useMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const socket: Socket = useStore((store) => store.socket) as any;
  const setSocket = useStore((store) => store.setSocket);
  const username = useStore((store) => store.username);
  const token = useStore((store) => store.token);

  useEffect(() => {
    if (!token || socket) return;

    setSocket(
      io('http://localhost:3001', {
        transports: ['polling'],
        transportOptions: { polling: { extraHeaders: { Authorization: token } } },
      })
    );
  }, [token]);

  useEffect(() => {
    if (!socket) return;

    socket.on('msgToClient', (message: string) => {
      onGetMessage(message);
    });
    socket.on('unauthorized', (message: string) => {
      onUnauthorized();
    });
  }, [socket]);

  const onUnauthorized = () => {
    console.log('Failed to estabilish websocket connection. Invalid JWT token.');
  };

  const onGetMessage = (message: string) => {
    const messageObject: Message = JSON.parse(message);
    setMessages((old) => [...old, messageObject]);
  };

  const sendMessage = (message: Message) => {
    message.user = username;
    socket.emit('msgToServer', JSON.stringify(message));
  };

  return { messages, sendMessage };
}
