import { io, Socket } from 'socket.io-client';
import create from 'zustand';
import { devtools } from 'zustand/middleware';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0IiwiaWF0IjoxNjQ2NTg0MDk5LCJleHAiOjE2NDY2NzA0OTl9.9GCkSZQlx2dFHVk3mSjSJ_lwycb1BJcGh97s1RQmRGk';

export const useStore = create(
  devtools((set: any) => ({
    socket: null,
    setSocket: (socket: any) => set((state: any) => (state.socket = socket)),
    username: '',
    setUsername: (username: any) => set((state: any) => (state.username = username)),
    token: null,
    setToken: (username: any) => set((state: any) => (state.token = token)),
  }))
);
