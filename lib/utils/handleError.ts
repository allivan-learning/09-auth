import { isAxiosError } from 'axios';

export const getErrorMessage = (error: unknown): string => {
  // 1. Проверяем, это вообще ошибка от Axios или что-то другое?
  if (isAxiosError(error)) {
    // 2. Если бэкенд прислал сообщение - берем его
    return error.response?.data?.message || 'Что-то пошло не так на сервере';
  }

  // 3. Если это какая-то другая ошибка (например, пропал интернет)
  return error instanceof Error
    ? error.message
    : 'Произошла неизвестная ошибка';
};
