/* eslint-disable no-unused-vars */
import { createContext, useContext } from 'react';
import { User } from '../../entities';

interface UserContextType {
  isAuthorized: boolean;
  token: string | null;
  refreshToken: string | null;
  user: User | null;
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
}

export const UserContext = createContext<UserContextType>({
  isAuthorized: false,
  token: null,
  refreshToken: null,
  user: null,
  login: () => {},
  logout: () => {},
});

export const useUserStore = () => useContext(UserContext);
