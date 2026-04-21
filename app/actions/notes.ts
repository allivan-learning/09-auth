'use server';

import { api } from '../../lib/api/api';
import { revalidatePath } from 'next/cache';
import { isAxiosError } from 'axios';

export async function createNoteAction(data: {
  title: string;
  content: string;
  tag: string;
}) {
  try {
    const response = await api.post('/notes', data);
    revalidatePath('/notes/filter/all');
    return response.data;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      console.error(
        'Ошибка при создании:',
        error.response?.data || error.message,
      );
      throw new Error(
        error.response?.data?.message || 'Не удалось создать заметку',
      );
    }
    throw new Error('Произошла неизвестная ошибка');
  }
}

export async function deleteNoteAction(id: string) {
  try {
    await api.delete(`/notes/${id}`);
    revalidatePath('/notes/filter/all');
    return id;
  } catch (error: unknown) {
    throw new Error('Ошибка при удалении');
  }
}
