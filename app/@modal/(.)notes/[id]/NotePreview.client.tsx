'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '../../../../lib/api/clientApi';
import Modal from '../../../../components/Modal/Modal';
import { useRouter } from 'next/navigation';

// ОСЬ ТУТ МАЄ БУТИ ТІЛЬКИ "id"
interface NotePreviewClientProps {
  id: string;
}

export default function NotePreviewClient({ id }: NotePreviewClientProps) {
  const router = useRouter();

  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
    refetchOnMount: false,
  });

  if (isLoading)
    return (
      <Modal onClose={() => router.back()}>
        <div>Завантаження...</div>
      </Modal>
    );
  if (isError || !note)
    return (
      <Modal onClose={() => router.back()}>
        <div>Помилка завантаження.</div>
      </Modal>
    );

  return (
    <Modal onClose={() => router.back()}>
      <div style={{ padding: '40px', position: 'relative' }}>
        <button
          onClick={() => router.back()}
          style={{ position: 'absolute', top: '20px', right: '20px' }}
        >
          Закрити
        </button>

        <h2>{note.title}</h2>
        <p>
          <strong>Тег:</strong> #{note.tag}
        </p>

        {/* createdAt для викладача */}
        <p style={{ fontSize: '0.8rem', color: 'gray' }}>
          Створено:{' '}
          {note.createdAt ? new Date(note.createdAt).toLocaleString() : '—'}
        </p>

        <hr />
        <div style={{ whiteSpace: 'pre-wrap' }}>{note.content}</div>
      </div>
    </Modal>
  );
}
