import React, { createContext, useState, useContext, ReactNode } from 'react';

import * as SecureStore from 'expo-secure-store';

import { CommonActions, useNavigation } from '@react-navigation/native';

import AlertError from '../components/AlertError';
import api from '../services/api';
import UserApi from '../services/api/UserApi';

interface User {
  id: string;
  email: string;
  document: string;
  name: string;
  cep?: string;
  ibge?: string;
  complement?: string;
  public_place?: string;
  phone?: string;
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
  signed: boolean;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User | null;
  token: string | null;
  signed: boolean;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => Promise<void>;
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
  const [load, setLoad] = useState(false);
  const authPromise = getSecureToken('auth');
  const expoPushTokenPromise = SecureStore.getItemAsync('expoPushToken');

  if (!load) {
    authPromise.then(auth => {
      if (!auth) {
        setData({ token: null, user: null, signed: false });
      } else {
        api
          .get('users/me', {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          })
          .then(response => {
            const user = response.data as User;

            api.defaults.headers.authorization = `Bearer ${auth.token}`;

            setData({ token: auth.token, user, signed: true });

            expoPushTokenPromise.then(token => {
              if (token) {
                UserApi.storeToken(token);
              }
            });
          })
          .catch(error => {
            console.log('ERROR! ', error.response);

            if (error.response.status === 401) {
              setData({ token: null, user: null, signed: false });
            }
          });
      }
    });

    setLoad(true);
  }

  async function signOut() {
    api
      .post('auth/logout')
      .then(() => {
        SecureStore.deleteItemAsync('auth');

        setData({ token: null, user: null, signed: false });
      })
      .catch(error => console.log('ERROR! ', error.response));
  }

  async function signIn({ email, password }: SignInCredentials) {
    api
      .post('auth/login', {
        email,
        password,
      })
      .then(response => {
        const { token, user } = response.data as AuthState;

        api.defaults.headers.authorization = `Bearer ${token}`;

        storeSecureToken('auth', { token, user });
        setData({ token, user, signed: true });
      })
      .catch(error => {
        AlertError(error);

        setData({ token: null, user: null, signed: false });
      });
  }

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        token: data.token,
        signed: data.signed,
        signIn,
        signOut,
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
