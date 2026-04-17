import React, { createContext, useState, useContext, useEffect } from 'react';
import { MOCK_USERS, MOCK_POSTS, MockUser } from '../data/mockData';

interface User {
  id: string;
  username: string;
  full_name: string;
  bio: string;
  profile_picture: string | null;
  followers_count: number;
  following_count: number;
  posts_count: number;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (identifier: string, password: string) => Promise<void>;
  register: (email: string, username: string, password: string, fullName: string) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // No stored auth - just finish loading
    setLoading(false);
  }, []);

  const login = async (identifier: string, password: string) => {
    await new Promise(resolve => setTimeout(resolve, 800));

    if (!identifier || !password) {
      throw new Error('Please enter your credentials');
    }

    if (password.length < 4) {
      throw new Error('Invalid credentials');
    }

    // Login succeeds with any valid input
    const userData: User = {
      id: 'me',
      username: identifier.includes('@') ? identifier.split('@')[0] : identifier,
      full_name: identifier.includes('@') ? identifier.split('@')[0] : identifier,
      bio: 'Just joined Moments!',
      profile_picture: null,
      followers_count: 0,
      following_count: 3,
      posts_count: 0,
    };

    setUser(userData);
  };

  const register = async (email: string, username: string, password: string, fullName: string) => {
    await new Promise(resolve => setTimeout(resolve, 800));

    if (!email || !username || !fullName || !password) {
      throw new Error('Please fill in all fields');
    }

    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters');
    }

    const userData: User = {
      id: 'me',
      username,
      full_name: fullName,
      bio: '',
      profile_picture: null,
      followers_count: 0,
      following_count: 3,
      posts_count: 0,
    };

    setUser(userData);
  };

  const logout = async () => {
    setUser(null);
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
