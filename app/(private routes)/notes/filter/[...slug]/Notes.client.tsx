'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { fetchNotes } from '../../../../../lib/api/clientApi';

import NoteList from '../../../../../components/NoteList/NoteList';
import SearchBox from '../../../../../components/SearchBox/SearchBox';

export default function NotesClient({ tag }: { tag: string }) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);
    return () => clearTimeout(handler);
  }, [search]);

  const { data, isLoading } = useQuery({
    queryKey: ['notes', tag, page, debouncedSearch],
    queryFn: () =>
      fetchNotes({ tag, page, perPage: 12, search: debouncedSearch }),
  });

  // МАГИЯ ЗДЕСЬ: Новый бекенд отдает сразу массив!
  // Если data - это массив, используем его. Иначе пустой массив.
  const notesArray = Array.isArray(data) ? data : data?.notes || [];
  const hasNotes = notesArray.length > 0;
  console.log(
    'DEBUG: NotesClient rendered. Tag:',
    tag,
    'Data:',
    data,
    'Loading:',
    isLoading,
  );
  return (
    <div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '20px',
        }}
      >
        <SearchBox value={search} onChange={setSearch} />
        <Link
          href="/notes/action/create"
          style={{
            padding: '10px 20px',
            backgroundColor: '#0070f3',
            color: 'white',
            borderRadius: '5px',
            textDecoration: 'none',
            fontWeight: 'bold',
          }}
        >
          Add Note +
        </Link>
      </div>

      {isLoading ? (
        <p>Loading notes...</p>
      ) : hasNotes ? (
        <NoteList notes={notesArray} />
      ) : (
        <p>No notes found in this category.</p>
      )}

      {/* ВАЖНО: Так как новый бекенд не возвращает totalPages в ответе, 
        мы пока скрываем пагинацию, чтобы она не ломала код.
      */}
    </div>
  );
}
