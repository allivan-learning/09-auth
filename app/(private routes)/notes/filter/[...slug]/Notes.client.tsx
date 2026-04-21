'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import {
  fetchNotes,
  type FetchNotesResponse,
} from '../../../../../lib/api/clientApi';

import NoteList from '../../../../../components/NoteList/NoteList';
import SearchBox from '../../../../../components/SearchBox/SearchBox';
// ВАЖЛИВО: Імпортуємо пагінацію
import Pagination from '../../../../../components/Pagination/Pagination';

export default function NotesClient({ tag }: { tag: string }) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Вказуємо тип для useQuery явно <FetchNotesResponse>
  const { data, isLoading } = useQuery<FetchNotesResponse>({
    queryKey: ['notes', tag, page, debouncedSearch],
    queryFn: () =>
      fetchNotes({ tag, page, perPage: 12, search: debouncedSearch }),
  });

  // ВИПРАВЛЕННЯ ЛОГІКИ:
  // 1. Отримуємо масив нотаток
  const notesArray = Array.isArray(data) ? data : data?.notes || [];

  // 2. Отримуємо кількість сторінок
  // Якщо це об'єкт - беремо з нього, якщо масив - ставимо 1 (або рахуємо)
  const totalPages =
    !Array.isArray(data) && data?.totalPages ? data.totalPages : 1;

  const hasNotes = notesArray.length > 0;

  return (
    <div>
      {/* ... твій код пошуку та кнопок ... */}

      {isLoading ? (
        <p>Loading notes...</p>
      ) : hasNotes ? (
        <>
          <NoteList notes={notesArray} />

          <div style={{ marginTop: '30px' }}>
            <Pagination
              current={page}
              total={totalPages}
              onChange={(newPage: number) => setPage(newPage)}
            />
          </div>
        </>
      ) : (
        <p>No notes found in this category.</p>
      )}
    </div>
  );
}
