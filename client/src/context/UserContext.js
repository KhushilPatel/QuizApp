// UserContext.js
import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { getToken, setToken, removeToken } from '@/lib/getToken'; // Implement these functions to manage token storage

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const token = getToken();

      if (!token) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://localhost:4000/api/auth/user', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Cache-Control': 'no-cache',
          },
        });
        setUser(response.data.userData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setUser(null);
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:4000/api/auth/login', { email, password });
      const { token } = response.data;
      setToken(token); // Store token in localStorage or sessionStorage
      setUser(response.data.userData);
    } catch (error) {
      console.error('Login error:', error);
      setUser(null);
    }
  };

  const logout = () => {
    removeToken(); // Clear token from storage
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
