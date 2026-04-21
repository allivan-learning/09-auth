import { api } from './api'; // Берем наш настроенный телефон из соседнего файла

// 1. Описываем, что мы ожидаем получить от формы
export interface LoginRequest {
  email: string;
  password: string;
}

// 2. Создаем функцию логина
export const login = async (data: LoginRequest) => {
  // Звоним на сервер по добавочному номеру '/auth/login' и передаем данные (data)
  const response = await api.post('/auth/login', data);

  // Возвращаем то, что ответил сервер (в нашем случае - профиль пользователя)
  return response.data;
};

// То, что мы отправляем при регистрации
export interface RegisterRequest {
  email: string;
  password: string;
}

// Сама функция регистрации
export const register = async (data: RegisterRequest) => {
  // Обрати внимание, тут адрес /auth/register
  const response = await api.post('/auth/register', data);
  return response.data;
};

// Описываем, как выглядит пользователь
export interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
}

// Функция: "Дай мне мои данные"
export const getMe = async () => {
  // Обрати внимание: мы используем get (получить), а не post (отправить)
  // И мы не передаем никакие data, потому что сервер сам узнает нас по cookie!
  const response = await api.get('/users/me');
  return response.data;
};

// Функция выхода
export const logout = async () => {
  // Просто бьем по эндпоинту /auth/logout
  await api.post('/auth/logout');
  // Мы даже не ждем данных в ответ, сервер просто удалит сессию у себя
};

// Удаление заметки
export const deleteNote = async (id: string): Promise<void> => {
  await api.delete(`/notes/${id}`);
};

// Получение списка заметок (если её вдруг тоже нет в этом файле)
export const fetchNotes = async ({
  tag,
  page = 1,
  perPage = 10,
  search = '',
}: {
  tag?: string;
  page?: number;
  perPage?: number;
  search?: string;
}) => {
  const { data } = await api.get('/notes', {
    params: {
      tag: tag === 'all' ? '' : tag,
      page,
      perPage,
      search,
    },
  });
  return data;
};

export const fetchNoteById = async (id: string) => {
  const { data } = await api.get(`/notes/${id}`);
  return data;
};

// Добавь это в clientApi.ts

// Создание заметки
export const createNote = async (data: {
  title: string;
  content: string;
  tag: string;
}) => {
  const response = await api.post('/notes', data);
  return response.data;
};

// Проверка сессии
export const checkSession = async () => {
  const response = await api.get('/auth/session');
  return response.data;
};

// Обновление профиля (понадобится для страницы Edit Profile)
export const updateMe = async (data: {
  username?: string;
  avatar?: string;
}) => {
  const response = await api.patch('/users/me', data);
  return response.data;
};
