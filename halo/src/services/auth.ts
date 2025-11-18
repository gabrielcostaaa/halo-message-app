import { AxiosError } from 'axios';
import { api } from './api';

export interface User {
  _id: string;
  name: string;
  username: string;
  isOnline: boolean;
  lastSeen?: string;
}

export interface AuthResponse {
  access_token: string;
}

export interface RegisterPayload {
  name: string;
  username: string;
  password: string;
}

const getErrorMessage = (error: unknown) => {
  if (error && typeof error === 'object' && 'message' in error) {
    return (error as { message?: string }).message ?? 'Erro inesperado';
  }

  return 'Erro inesperado';
};

export async function login(username: string, password: string): Promise<User> {
  try {
    // TODO: Implementar endpoint de autenticação no backend
    // Por enquanto, vamos buscar o usuário pelo username
    const { data } = await api.get<User[]>('/users');
    const user = data.find((u) => u.username === username);

    if (!user) {
      throw new Error('Usuário não encontrado');
    }

    // TODO: Verificar senha quando autenticação estiver implementada

    return user;
  } catch (error) {
    const message =
      error instanceof AxiosError
        ? error.response?.data?.message || 'Não foi possível autenticar'
        : getErrorMessage(error);
    throw new Error(message);
  }
}

export async function register(payload: RegisterPayload): Promise<User> {
  try {
    const { data } = await api.post<User>('/users', payload);
    return data;
  } catch (error) {
    const message =
      error instanceof AxiosError
        ? error.response?.data?.message || 'Falha ao criar conta'
        : getErrorMessage(error);
    throw new Error(message);
  }
}
