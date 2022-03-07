import { io, Socket } from 'socket.io-client';
import create from 'zustand';
import { devtools } from 'zustand/middleware';

export const useStore = create(
  devtools((set: any) => ({
    socket: null,
    setSocket: (socket: any) => set((state: any) => (state.socket = socket)),
    username: '',
    setUsername: (username: any) => set((state: any) => (state.username = username)),
    token: null,
    setToken: (token: any) => set((state: any) => (state.token = token)),
  }))
);
