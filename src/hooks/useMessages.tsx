import { useEffect, useState } from 'react';
import { Socket, io } from 'socket.io-client';
import { Message } from '../components/MessageListItem';

export function useMessages() {
  const [messages, setMessages] = useState<Message[]>([]);

  const [socket] = useState<Socket>(io('https://wschatserv.bieda.it', { transports: ['polling'] }));

  useEffect(() => {
    socket.on('msgToClient', (message: string) => {
      const messageObject: Message = JSON.parse(message);
      setMessages((old) => [...old, messageObject]);
    });
  }, []);

  const sendMessage = (message: Message) => {
    socket.emit('msgToServer', JSON.stringify(message));
  };

  return { messages, sendMessage };
}
