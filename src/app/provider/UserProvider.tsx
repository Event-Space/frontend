/* eslint-disable no-console */
import { ReactNode, useMemo, useState, useCallback } from 'react';
import { UserContext } from '../store/useUserStore';
import { User } from '../../entities';

export function UserProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem('accessToken')
  );
  const [refreshToken, setRefreshToken] = useState<string | null>(
    localStorage.getItem('refreshToken')
  );
  const [user, setUser] = useState<User | null>(null);
  const isAuthorized = !!token;

  const fetchUserData = useCallback(async (accessToken: string) => {
    try {
      const response = await fetch(
        'https://server.kenuki.org/api/user/profile',
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      if (response.ok) {
        const userData: User = await response.json();
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
      } else {
        console.error('Failed to fetch user data');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }, []);

  const login = useCallback(
    async (accessToken: string, newRefreshToken: string) => {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', newRefreshToken);

      setToken(accessToken);
      setRefreshToken(newRefreshToken);

      await fetchUserData(accessToken);
    },
    [fetchUserData]
  );

  const logout = useCallback(() => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');

    setToken(null);
    setRefreshToken(null);
    setUser(null);
  }, []);

  const contextValue = useMemo(
    () => ({
      isAuthorized,
      token,
      refreshToken,
      user,
      login,
      logout,
    }),
    [isAuthorized, token, refreshToken, user, login, logout]
  );

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}
