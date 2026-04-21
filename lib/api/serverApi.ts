import { cookies } from 'next/headers';
import { AxiosResponse } from 'axios';

import { api } from '../api/api';
import { Note } from '../../types/note'; // Підправ шлях до твоїх типів
import { User } from '../../types/user';
/**
 * Допоміжна функція для отримання кук для сервера
 */
const getAuthHeaders = async () => {
  const cookieStore = await cookies();
  const allCookies = cookieStore.getAll();
  return allCookies.map((c) => `${c.name}=${c.value}`).join('; ');
};

// --- Функції для серверних компонентів ---

export const fetchNotes = async (params: {
  tag?: string;
  page?: number;
  perPage?: number;
  search?: string;
}): Promise<Note[]> => {
  const cookieHeader = await getAuthHeaders();
  const { data } = await api.get<Note[]>('/notes', {
    params: {
      ...params,
      tag: params.tag === 'all' ? '' : params.tag,
    },
    headers: { Cookie: cookieHeader },
  });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const cookieHeader = await getAuthHeaders();
  const { data } = await api.get<Note>(`/notes/${id}`, {
    headers: { Cookie: cookieHeader },
  });
  return data;
};

export const getMe = async (): Promise<User> => {
  const cookieHeader = await getAuthHeaders();
  const { data } = await api.get<User>('/users/me', {
    headers: { Cookie: cookieHeader },
  });
  return data;
};

/**
 * ПОВЕРТАЄМО ПОВНИЙ AxiosResponse (з заголовками), як вимагає ментор
 * Це потрібно для Middleware, щоб він міг прочитати 'set-cookie'
 */
export const checkSession = async (): Promise<AxiosResponse<User>> => {
  const cookieHeader = await getAuthHeaders();
  return api.get<User>('/auth/session', {
    headers: { Cookie: cookieHeader },
  });
};
