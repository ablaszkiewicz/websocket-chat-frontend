import { io, Socket } from 'socket.io-client';
import create, { GetState, SetState } from 'zustand';
import { devtools } from 'zustand/middleware';
import { Message } from '../entities/Message';

type Store = {
  socket: any;
  setSocket: any;
  username: string;
  setUsername: any;
  isGuest: boolean;
  setIsGuest: any;
  token: string;
  setToken: any;
  messages: Message[];
  addMessage: any;
};

export const useStore = create<Store>(
  devtools((set: SetState<Store>, get: GetState<Store>) => ({
    isGuest: true,
    setIsGuest: (isGuest: boolean) => set((state) => ({ ...state, isGuest })),
    socket: null,
    setSocket: (socket: any) => set((state: any) => (state.socket = socket)),
    username: '',
    setUsername: (username: any) => set((state: any) => (state.username = username)),
    token: '',
    setToken: (token: any) => set((state: any) => (state.token = token)),
    messages: [],
    addMessage: (message: Message) => set((state: any) => ({ messages: [...state.messages, message] })),
  }))
);
