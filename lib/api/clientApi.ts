import { api } from './api';
import { Note } from '../../types/note';
import { User } from '../../types/user';

// 1. Спочатку ІМПОРТУЄМО типи для використання всередині цього файлу
import { LoginRequest } from '../../types/LoginRequest';
import { RegisterRequest } from '../../types/RegisterRequest';

// 2. Потім ЕКСПОРТУЄМО їх, щоб сторінки Login/Register теж їх бачили
export type { LoginRequest, RegisterRequest };

// --- Далі весь код запрацює ---

export const login = async (data: LoginRequest): Promise<User> => {
  const response = await api.post<User>('/auth/login', data);
  return response.data;
};

export const register = async (data: RegisterRequest): Promise<User> => {
  const response = await api.post<User>('/auth/register', data);
  return response.data;
};

export const getMe = async (): Promise<User> => {
  const response = await api.get<User>('/users/me');
  return response.data;
};

export const logout = async (): Promise<void> => {
  await api.post('/auth/logout');
};

export const checkSession = async (): Promise<User> => {
  const response = await api.get<User>('/auth/session');
  return response.data;
};

// ВИМОГА: Тільки username
export const updateMe = async (data: { username: string }): Promise<User> => {
  const response = await api.patch<User>('/users/me', data);
  return response.data;
};

// --- Notes ---

export type FetchNotesResponse = Note[] | { notes: Note[]; totalPages: number };

export const fetchNotes = async (params: {
  tag?: string;
  page?: number;
  perPage?: number;
  search?: string;
}): Promise<FetchNotesResponse> => {
  // Використовуємо новий тип тут
  const { data } = await api.get<FetchNotesResponse>('/notes', {
    params: {
      ...params,
      tag: params.tag === 'all' ? '' : params.tag,
    },
  });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await api.get<Note>(`/notes/${id}`);
  return data;
};

export const createNote = async (data: {
  title: string;
  content: string;
  tag: string;
}): Promise<Note> => {
  const response = await api.post<Note>('/notes', data);
  return response.data;
};

// ВИМОГА: Повертати видалену нотатку
export const deleteNote = async (id: string): Promise<Note> => {
  const response = await api.delete<Note>(`/notes/${id}`);
  return response.data;
};
