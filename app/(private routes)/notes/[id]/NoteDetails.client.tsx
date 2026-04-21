'use client';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '../../../../lib/api/clientApi';
import { useRouter } from 'next/navigation';

export default function NoteDetailsClient({ id }: { id: string }) {
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

  if (isLoading) return <div style={{ padding: '40px' }}>Завантаження...</div>;
  if (isError || !note)
    return <div style={{ padding: '40px' }}>Помилка завантаження.</div>;

  return (
    <div style={{ padding: '40px' }}>
      <button onClick={() => router.back()}>Назад</button>
      <h2>{note.title}</h2>
      <p>#{note.tag}</p>
      <p style={{ color: 'gray' }}>
        Створено:{' '}
        {note.createdAt ? new Date(note.createdAt).toLocaleString() : '—'}
      </p>
      <hr />
      <div style={{ whiteSpace: 'pre-wrap' }}>{note.content}</div>
    </div>
  );
}
