import React, { createContext, useContext, useEffect, useState } from 'react';

import * as SecureStore from 'expo-secure-store';

import { Alert, View } from 'react-native';

import api from '../services/api';

import { AxiosError } from 'axios';

import Loading from '../components/Loading';

interface Cliente {
  id: number;
  imagem: string;
  imagem_url: string;
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
  token: string;
};

interface AuthContextData {
  cliente: Cliente;
  signIn(credentials: SignInCredentials): Promise<void>;
  updateProfile(data: any): Promise<void>;
  signOut(): void;
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
    async function loadStoragedData() {
      const cliente = await SecureStore.getItemAsync('cliente');

      const token = await SecureStore.getItemAsync('token');

      if (cliente && token) {
        api.defaults.headers['Authorization'] = `Bearer ${token}`;
        setData({
          cliente: JSON.parse(cliente),
          token
        });
      };
      setLoading(false);
    };

    loadStoragedData();
  }, []);

  async function signIn(credentials: SignInCredentials) {
    const { email, senha } = credentials;

    await api.post('login', {email, senha}).then((response) => {
      SecureStore.setItemAsync('cliente', JSON.stringify(response.data.cliente));
      SecureStore.setItemAsync('token', response.data.token);
      
      api.defaults.headers['Authorization'] = `Bearer ${response.data.token}`;

      setData({
        cliente: response.data.cliente,
        token: response.data.token
      });
    }).catch((error: AxiosError) => {
       const apiErrorMessage = error.response?.data.erro;
       
       Alert.alert('Erro', apiErrorMessage);
    });
  };

  async function updateProfile(cliente: Cliente) {
    await SecureStore.setItemAsync('cliente', JSON.stringify(cliente));

    setData({ cliente, token: data.token });
  };

  async function signOut() {
    await SecureStore.deleteItemAsync('cliente');
    await SecureStore.deleteItemAsync('token');

    setData({} as AuthState);
  };

  if (loading) {
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Loading />
    </View>
  };

  return (
    <AuthContext.Provider 
      value={{
        cliente: data.cliente, 
        signIn, 
        updateProfile,
        signOut 
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