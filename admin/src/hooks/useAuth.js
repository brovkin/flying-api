import { useState, useCallback, useEffect } from 'react';
import jwtDecode from 'jwt-decode';

const storageName = 'accessToken';

export const useAuth = () => {
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);

  const login = useCallback((jwtToken, id) => {
    setToken(jwtToken);
    setUserId(id);

    localStorage.setItem(
      storageName,
      JSON.stringify({ token: jwtToken, userId: id })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem(storageName);
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName));
    if (data && data.token) {
      const { exp } = jwtDecode(data.token);
      // Refresh the token a minute early to avoid latency issues
      const expirationTime = exp * 1000;

      if (Date.now() >= expirationTime) {
        logout();
      } else {
        login(data.token, data.userId);
      }
    }
  }, [login]);

  return { login, token, logout, userId };
};
