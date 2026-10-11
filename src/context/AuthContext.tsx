'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

export interface UserSubscription {
  plan: string;
  expiresAt: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role?: 'advocate' | 'judge' | 'student' | 'member';
  avatar?: string;
  purchasedBooks: string[];
  subscription?: null | UserSubscription;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email?: string, password?: string) => Promise<boolean | void>;
  register: (name: string, email: string, password?: string) => Promise<boolean>;
  logout: () => void;
  purchaseBook: (bookId: string | number) => void;
  hasPurchased: (bookId: string | number) => boolean;
}

const STORAGE_KEY = 'lexbooks_user';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setUser(JSON.parse(stored));
      }
    } catch {
      // Local storage unavailable or SSR
    } finally {
      setIsLoading(false);
    }
  }, []);

  const saveUser = useCallback((updatedUser: User | null) => {
    setUser(updatedUser);
    try {
      if (updatedUser) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser));
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }
    } catch {
      // ignore
    }
  }, []);

  const login = useCallback(async (email?: string, _password?: string) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 400));
    const targetEmail = (email || 'rksharma@supremecourt.in').trim().toLowerCase();
    const existing = (() => {
      try {
        const s = localStorage.getItem(STORAGE_KEY);
        return s ? JSON.parse(s) : null;
      } catch {
        return null;
      }
    })();

    const activeUser: User = {
      id: existing?.id || 'usr-101',
      name: existing?.name || (targetEmail.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())),
      email: targetEmail,
      role: 'advocate',
      purchasedBooks: existing?.purchasedBooks || ['1', 'constitution-of-india-commentary-and-analysis'],
      subscription: existing?.subscription || { plan: 'Pro Chamber', expiresAt: '2026-12-31' },
    };

    saveUser(activeUser);
    setIsLoading(false);
    return true;
  }, [saveUser]);

  const register = useCallback(async (name: string, email: string, _password?: string) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 400));
    const newUser: User = {
      id: `usr_${Date.now()}`,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      role: 'advocate',
      purchasedBooks: [],
      subscription: null,
    };
    saveUser(newUser);
    setIsLoading(false);
    return true;
  }, [saveUser]);

  const logout = useCallback(() => {
    saveUser(null);
  }, [saveUser]);

  const purchaseBook = useCallback((bookId: string | number) => {
    const idStr = String(bookId);
    setUser((currentUser) => {
      if (!currentUser) {
        const guestUser: User = {
          id: `usr_${Date.now()}`,
          name: 'Advocate Member',
          email: 'advocate@lexbooks.in',
          role: 'advocate',
          purchasedBooks: [idStr],
          subscription: null,
        };
        try {
          localStorage.setItem(STORAGE_KEY, JSON.stringify(guestUser));
        } catch {}
        return guestUser;
      }

      if (currentUser.purchasedBooks.includes(idStr)) return currentUser;

      const updated: User = {
        ...currentUser,
        purchasedBooks: [...currentUser.purchasedBooks, idStr],
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch {}
      return updated;
    });
  }, []);

  const hasPurchased = useCallback(
    (bookId: string | number): boolean => {
      if (!user) return false;
      const idStr = String(bookId);
      return user.purchasedBooks.includes(idStr);
    },
    [user]
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        purchaseBook,
        hasPurchased,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
