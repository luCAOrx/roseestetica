import React, { createContext, useContext, useEffect, useState } from 'react';

import * as SecureStore from 'expo-secure-store';

import { Alert } from 'react-native';

import api from '../services/api';

import dayjs from 'dayjs';

interface Cliente {
  id: number;
  nome: string;
  cpf: string;
  telefone: string;
  celular: string;
  sexo: string;
  cidade: string;
  cidade_id: number;
  bairro: string;
  logradouro: string;
  numero: string;
  complemento: string;
  cep: string;
  email: string;
  senha: string;
};

interface AuthState {
  cliente: Cliente;
  imagem_url: string;
  token: string;
  refreshToken: {
    id: string;
    espira_em: number;
    cliente_id: number;
  }
};

interface AuthContextData {
  cliente: Cliente;
  imagem_url: string;
  signIn(credentials: SignInCredentials): Promise<void>;
  requestRefreshToken(): Promise<void>;
  updateProfile(cliente: Cliente): Promise<void>;
  updatePhoto(imagem_url: string): Promise<void>;
  signOut(): void;
  loading: boolean;
};

interface SignInCredentials {
  email: string;
  senha: string;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStorageData() {
      const cliente = await SecureStore.getItemAsync('cliente');

      const imagem_url = await SecureStore.getItemAsync('imagem_url');

      const token = await SecureStore.getItemAsync('token');

      const refreshToken = await SecureStore.getItemAsync('refreshToken');

      if (cliente && imagem_url && token && refreshToken) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        setData({
          cliente: JSON.parse(cliente),
          imagem_url,
          token,
          refreshToken: JSON.parse(refreshToken)
        });

        setLoading(false)
      };
    };

    loadStorageData();
  }, []);

  async function signIn(credentials: SignInCredentials) {
    const { email, senha } = credentials;

    await api.post('login', {email, senha}).then(async (response) => {
      await SecureStore.setItemAsync('cliente', JSON.stringify(response.data.cliente));
      await SecureStore.setItemAsync('imagem_url', response.data.imagem_url);
      await SecureStore.setItemAsync('token', response.data.token);
      await SecureStore.setItemAsync('refreshToken', JSON.stringify(response.data.refreshToken));
      
      api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

      setData({
        cliente: response.data.cliente,
        imagem_url: response.data.imagem_url,
        token: response.data.token,
        refreshToken: {
          id: response.data.refreshToken.id,
          espira_em: response.data.refreshToken.espira_em,
          cliente_id: response.data.refreshToken.cliente_id
        }
      });      
    });
  };

  async function requestRefreshToken() {
    const {id, espira_em} = data.refreshToken;

    const refreshTokenExpired = dayjs().isAfter(
      dayjs.unix(espira_em)
    );

    if (refreshTokenExpired) {

      await api.post('refresh_token', {refresh_token: id}).then(async response => {
        await SecureStore.deleteItemAsync('token');
        await SecureStore.deleteItemAsync('refreshToken');

        await SecureStore.setItemAsync('token', response.data.token);
        await SecureStore.setItemAsync(
          'refreshToken', 
          JSON.stringify(response.data.refreshToken)
        );
        
        api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        
        setData({
          cliente: data.cliente,
          imagem_url: data.imagem_url,
          token: response.data.token,
          refreshToken: {
            id: response.data.refreshToken.id,
            espira_em: response.data.refreshToken.espira_em,
            cliente_id: response.data.refreshToken.cliente_id
          }
        });

      }).catch(error => {
        Alert.alert('Erro', error.response.data);

        signOut();
      });
    };
  };
  
  async function updateProfile(cliente: Cliente) {
    await SecureStore.setItemAsync('cliente', JSON.stringify(cliente));

    setData({ 
      cliente, 
      imagem_url: data.imagem_url,
      token: data.token, 
      refreshToken: data.refreshToken 
    });
  };

  async function updatePhoto(imagem_url: string) {
    await SecureStore.setItemAsync('imagem_url', imagem_url);

    setData({ 
      cliente: data.cliente, 
      imagem_url,
      token: data.token, 
      refreshToken: data.refreshToken 
    });
  };

  async function signOut() {
    await SecureStore.deleteItemAsync('cliente');
    await SecureStore.deleteItemAsync('imagem_url');
    await SecureStore.deleteItemAsync('token');
    await SecureStore.deleteItemAsync('refreshToken');

    setData({} as AuthState);
  };

  return (
    <AuthContext.Provider 
      value={{
        cliente: data.cliente, 
        imagem_url: data.imagem_url,
        signIn, 
        requestRefreshToken,
        updateProfile,
        updatePhoto,
        signOut,
        loading
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  return context;
};