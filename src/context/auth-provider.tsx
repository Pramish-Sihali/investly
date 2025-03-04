'use client';

import { toast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect, useContext, createContext } from 'react';
import { loginMutationFn, logoutMutationFn, registerMutationFn } from '@/lib/api';

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  [key: string]: any;
};

type LoginData = {
  email: string;
  password: string;
};

type RegisterData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type AuthContextType = {
  user: User | null;
  isLoggedIn: boolean;
  isLoading: boolean;
  login: (data: LoginData) => Promise<void>;
  signin: (data: LoginData) => Promise<void>;
  signup: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  signout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Check for existing auth on mount and window focus
  useEffect(() => {
    checkAuth();

    // Also check auth when window gets focus
    window.addEventListener('focus', checkAuth);
    return () => window.removeEventListener('focus', checkAuth);
  }, []);

  const checkAuth = () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('authToken');
      const userData = localStorage.getItem('userData');

      if (token && userData) {
        setIsLoggedIn(true);
        setUser(JSON.parse(userData));
      } else {
        setIsLoggedIn(false);
        setUser(null);
      }
    } catch (error) {
      console.error('Auth check error:', error);
      setIsLoggedIn(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (data: LoginData) => {
    setIsLoading(true);
    try {
      const response = await loginMutationFn(data);

      if (response?.data?.access) {
        const { access, refresh, user } = response.data;

        // Store auth data
        localStorage.setItem('authToken', access);
        localStorage.setItem('refreshToken', refresh);
        localStorage.setItem('userData', JSON.stringify(user));

        // Update state
        setUser(user);
        setIsLoggedIn(true);

        toast({
          title: 'Login Successful',
          description: 'Welcome back! You have successfully logged in.',
          variant: 'default',
        });

        // Redirect based on role
        const roleRoutes: { [key: string]: string } = {
          Investor: '/investors',
          Startup: '/',
          Mentor: '/',
        };

        const redirectPath = roleRoutes[user.role] || '/';
        router.replace(redirectPath);
      }
    } catch (error: any) {
      const message = error.message || 'Login failed. Please try again.';
      toast({
        title: 'Login Error',
        description: message,
        variant: 'destructive',
      });
      setIsLoggedIn(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Alias for login
  const signin = login;

  const signup = async (data: RegisterData) => {
    setIsLoading(true);
    try {
      const response = await registerMutationFn(data);

      toast({
        title: 'Registration Successful',
        description: 'Please check your email to verify your account.',
        variant: 'default',
      });

      router.push('/login');
    } catch (error: any) {
      const message = error.message || 'Registration failed. Please try again.';
      toast({
        title: 'Registration Error',
        description: message,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      // Call logout API
      await logoutMutationFn();

      // Clear local storage
      localStorage.removeItem('authToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('userData');

      // Update state
      setIsLoggedIn(false);
      setUser(null);

      toast({
        title: 'Logout Successful',
        description: 'You have been logged out successfully.',
        variant: 'default',
      });

      router.push('/login');
    } catch (error) {
      console.error('Logout error:', error);

      // Even if API fails, clear local storage and state
      localStorage.removeItem('authToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('userData');
      setIsLoggedIn(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Alias for logout
  const signout = logout;

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn,
        isLoading,
        login,
        signin,
        signup,
        logout,
        signout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
