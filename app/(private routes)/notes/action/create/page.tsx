import { Metadata } from 'next';
import React from 'react';
import css from './CreateNote.module.css';

// Звичайний імпорт нашої клієнтської обгортки
import NoteFormWrapper from '../../../../components/NoteForm/NoteFormWrapper';

// Додаємо SEO метадані (з урахуванням виправлень для openGraph)
export const metadata: Metadata = {
  title: 'Create Note | NoteHub',
  description: 'Create a new note to stay organized.',
  openGraph: {
    title: 'Create Note | NoteHub',
    description: 'Create a new note to stay organized.',
    type: 'website',
    // Додано обов'язкову властивість url
    url: 'https://your-domain.com/notes/action/create',
    // Додано масив images з одним об'єктом-зображенням
    images: [
      {
        url: '/images/og-create-note.jpg', // Шлях до зображення у папці public
        width: 1200,
        height: 630,
        alt: 'Create Note interface preview',
      },
    ],
  },
};

export default function CreateNotePage() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        {/* Використовуємо обгортку */}
        <NoteFormWrapper />
      </div>
    </main>
  );
}
