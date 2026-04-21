'use client';

import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
// Выходим из components (..), выходим в корень (..), заходим в app/actions
import { createNoteAction } from '../../app/actions/notes';
import css from './NoteForm.module.css';

export default function NoteFormWrapper() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tag, setTag] = useState('Personal'); // Значение по умолчанию

  const { mutate, isPending } = useMutation({
    mutationFn: createNoteAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      router.push('/notes/filter/all');
    },
    onError: (err: unknown) => {
      // Проверяем, является ли err объектом ошибки
      if (err instanceof Error) {
        alert('Ошибка при создании: ' + err.message);
      } else {
        alert('Произошла неизвестная ошибка');
      }
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Отправляем объект с 3 полями, которые ждет сервер
    mutate({ title, content, tag });
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <input
        className={css.input}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Заголовок"
        required
      />

      <select
        className={css.select}
        value={tag}
        onChange={(e) => setTag(e.target.value)}
      >
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Todo">Todo</option>
        <option value="Shopping">Shopping</option>
      </select>

      <textarea
        className={css.textarea}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Текст заметки..."
        required
      />

      <button className={css.button} type="submit" disabled={isPending}>
        {isPending ? 'Сохранение...' : 'Создать заметку'}
      </button>
    </form>
  );
}
