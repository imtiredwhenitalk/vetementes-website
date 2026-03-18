import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '../services/api';

interface User {
  id: string;
  email: string;
  first_name?: string;
  last_name?: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(api.getToken());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      if (token) {
        try {
          const { user: userData } = await api.verifyToken();
          setUser(userData);
        } catch (error) {
          console.error('Token verification failed:', error);
          setToken(null);
          api.setToken(null);
        }
      }
      setIsLoading(false);
    };

    verifyAuth();
  }, [token]);

  const login = async (email: string, password: string) => {
    const response = await api.login({ email, password });
    setToken(response.token);
    setUser(response.user);
    api.setToken(response.token);
  };

  const register = async (userData: any) => {
    const response = await api.register(userData);
    setToken(response.token);
    setUser(response.user);
    api.setToken(response.token);
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    api.setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        register,
        logout,
        isAuthenticated: !!token && !!user,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
