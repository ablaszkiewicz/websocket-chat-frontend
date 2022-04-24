import axios from 'axios';
import { baseUrl } from '..';
import { useStore } from '../zustand/store';
import { useMessages } from './useMessages';

export function useAuth() {
  const setUsername = useStore((store) => store.setUsername);
  const setToken = useStore((store) => store.setToken);
  const setIsGuest = useStore((store) => store.setIsGuest);
  const { onGetSystemMessage } = useMessages();

  const loginAsGuest = async () => {
    const response = await axios.post(`${baseUrl}/auth/guest`);

    setIsGuest(true);
    setUsername(response.data.username);
    setToken(response.data.token);
    onGetSystemMessage(`Connected as ${response.data.username}`);
  };

  const login = async (username: string, password: string): Promise<boolean> => {
    const response = await axios.post('/auth/login', { username, password });

    setUsername(response.data.username);
    setToken(response.data.token);
    onGetSystemMessage(`Connected as ${response.data.username}`);

    if (response.status === 201) {
      setIsGuest(false);
      return true;
    } else {
      return false;
    }
  };

  const register = async (username: string, password: string) => {
    const response = await axios.post('/users', { username, password });

    if (response.status == 201) {
      return true;
    } else {
      return false;
    }
  };

  return { loginAsGuest, login, register };
}
