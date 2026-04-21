import axios from 'axios';
import { cookies } from 'next/headers';

const baseURL = process.env.NEXT_PUBLIC_API_URL + '/api';

export const serverApi = axios.create({
  baseURL,
});

// Перехватчик ТОЛЬКО для сервера: он сам достает куки из Next.js и кладет в заголовки
serverApi.interceptors.request.use(async (config) => {
  const cookieStore = await cookies();
  const cookieHeader = cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join('; ');

  if (cookieHeader) {
    config.headers.Cookie = cookieHeader;
  }

  return config;
});

// --- Функции для серверных компонентов ---

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
  const { data } = await serverApi.get('/notes', {
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
  const { data } = await serverApi.get(`/notes/${id}`);
  return data;
};

export const getMe = async () => {
  const { data } = await serverApi.get('/users/me');
  return data;
};

export const checkSession = async () => {
  const { data } = await serverApi.get('/auth/session');
  return data;
};
