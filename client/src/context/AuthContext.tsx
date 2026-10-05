import { createContext, useState, useEffect, type ReactNode } from 'react';
import type { User, RegisterFormData, LoginFormData, ViewState } from '../types/auth';
import type { LoadData } from '../types/api';

import { authService } from '../services/authService';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  currentView: ViewState;
  register: (data: RegisterFormData) => Promise<void>;
  login: (credentials: LoginFormData) => Promise<void>;
  recharge: (cardData: LoadData) => Promise<void>;
  logout: () => void;
  navigateTo: (view: ViewState) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentView, setCurrentView] = useState<ViewState>('register');

  useEffect(() => {
    const activeSession = authService.getActiveSession();

    if (activeSession) {
      setUser(activeSession);
      setCurrentView('welcome');
    } else {
      setCurrentView('register');
    }

    setIsLoading(false);
  }, []);

  const register = async (data: RegisterFormData): Promise<void> => {
    setIsLoading(true);

    try {
      const newUser = await authService.register(data);
      setUser(newUser);
      setCurrentView('welcome');
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (credentials: LoginFormData): Promise<void> => {
    setIsLoading(true);

    try {
      const loggedUser = await authService.login(credentials);
      setUser(loggedUser);
      setCurrentView('welcome');
    } finally {
      setIsLoading(false);
    }
  };

  const recharge = async (cardData: LoadData): Promise<void> => {
    setIsLoading(true);

    try {
      const loggedUser = await authService.rechargeBalance(cardData);
      setUser(loggedUser);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = (): void => {
    authService.logout();
    setUser(null);
    setCurrentView('login');
  };

  const navigateTo = (view: ViewState): void => {
    if (view === 'welcome' && !user) {
      setCurrentView('login');
      return;
    }

    setCurrentView(view);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: Boolean(user),
    isLoading,
    currentView,
    register,
    login,
    recharge,
    logout,
    navigateTo,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};