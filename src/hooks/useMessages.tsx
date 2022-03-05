import { useEffect, useState } from 'react';
import { Socket, io } from 'socket.io-client';
import { Message } from '../components/MessageListItem';
import { useStore } from '../zustand/store';

export function useMessages() {
  const [messages, setMessages] = useState<Message[]>([]);
  const socket: Socket = useStore((store) => store.socket) as any;
  const setUsername = useStore((store) => store.setUsername);

  useEffect(() => {
    socket.on('msgToClient', (message: string) => {
      onGetMessage(message);
    });
  }, [socket]);

  const onGetMessage = (message: string) => {
    const messageObject: Message = JSON.parse(message);
    setMessages((old) => [...old, messageObject]);
  };

  const sendMessage = (message: Message) => {
    setUsername(message.user);
    socket.emit('msgToServer', JSON.stringify(message));
  };

  return { messages, sendMessage };
}
