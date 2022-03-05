import { io, Socket } from 'socket.io-client';
import create from 'zustand';
import { devtools } from 'zustand/middleware';

export const useStore = create(
  devtools((set: any) => ({
    //socket: io('http://localhost:3001', { transports: ['polling'] }),
    socket: io('https://wschatserv.bieda.it', { transports: ['polling'] }),
    setSocket: (socket: any) => set((state: any) => ({ socket: socket })),
  }))
);
