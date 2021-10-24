import React, { createContext, useState, useContext, ReactNode } from 'react';

import * as SecureStore from 'expo-secure-store';

import { CommonActions, useNavigation } from '@react-navigation/native';

import api from '../Services/api';

interface User {
  id: string;
  email: string;
  document: string;
  name: string;
  cep?: string;
  ibge?: string;
  neighborhood?: string;
  online: boolean;
  photo?: string;
  receive_notification: boolean;
  third_party_login: boolean;
  created_at: Date;
  updated_at: Date;
  verified: boolean;
}

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  token: string;
  signIn: (credentials: SignInCredentials) => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

async function storeSecureToken(key, value) {
  await SecureStore.setItemAsync(key, JSON.stringify(value));
}

async function getSecureToken(key) {
  const item = await SecureStore.getItemAsync(key);

  return JSON.parse(item);
}
// SecureStore.deleteItemAsync

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const authPromise = getSecureToken('auth');
  // SecureStore.deleteItemAsync('auth');
  authPromise.then(auth => {
    api.defaults.headers.authorization = `Bearer ${auth.token}`;

    setData({ token: auth.token, user: auth.user });
  });

  async function signIn({ email, password }: SignInCredentials) {
    const response = await api.post('auth/login', {
      email,
      password,
    });

    const { token, user } = response.data;

    api.defaults.headers.authorization = `Bearer ${token}`;

    storeSecureToken('auth', { token, user });
    setData({ token, user });
  }

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        token: data.token,
        signIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth, getSecureToken, storeSecureToken };
