'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '../../lib/api/clientApi';
import css from './NoteForm.module.css';

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();

  // Локальный стейт для формы вместо Zustand
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tag, setTag] = useState('Todo');

  const mutation = useMutation({
    mutationFn: createNote, // Строго из clientApi.ts, как в ТЗ
    onSuccess: () => {
      // Инвалидируем кэш, чтобы список заметок обновился
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      router.push('/notes');
    },
    onError: (err: unknown) => {
      if (err instanceof Error) alert('Помилка: ' + err.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate({ title, content, tag });
  };

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <h3 className={css.title}>Add New Note</h3>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className={css.input}
        required
      />

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        className={css.textarea}
        required
      />

      <select
        value={tag}
        onChange={(e) => setTag(e.target.value)}
        className={css.select}
        required
      >
        <option value="Todo">Todo</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
        <option value="Meeting">Meeting</option>
        <option value="Shopping">Shopping</option>
      </select>

      <div className={css.actions}>
        <button
          type="button"
          onClick={() => router.back()}
          className={css.cancelBtn}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={css.submitBtn}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? 'Saving...' : 'Save'}
        </button>
      </div>
    </form>
  );
}
