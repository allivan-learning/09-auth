'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useDebounce } from 'use-debounce'; // Вимога ментора
import {
  fetchNotes,
  type FetchNotesResponse,
} from '../../../../../lib/api/clientApi';

import NoteList from '../../../../../components/NoteList/NoteList';
import SearchBox from '../../../../../components/SearchBox/SearchBox';
import Pagination from '../../../../../components/Pagination/Pagination';

export default function NotesClient({ tag: tagProp }: { tag?: string }) {
  const params = useParams();

  // ВИМОГА МЕНТОРА: Логіка отримання тега через useParams
  const slug = params?.slug;
  const tagFromUrl = Array.isArray(slug) ? slug[0] : slug;
  const currentTag = tagProp || tagFromUrl || 'all';

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');

  // ВИМОГА МЕНТОРА: Використання useDebounce з бібліотеки
  const [debouncedSearch] = useDebounce(search, 500);

  const { data, isLoading } = useQuery<FetchNotesResponse>({
    queryKey: ['notes', currentTag, page, debouncedSearch],
    queryFn: () =>
      fetchNotes({
        tag: currentTag,
        page,
        perPage: 12,
        search: debouncedSearch,
      }),
  });

  const notesArray = Array.isArray(data) ? data : data?.notes || [];
  const totalPages =
    !Array.isArray(data) && data?.totalPages ? data.totalPages : 1;
  const hasNotes = notesArray.length > 0;

  // Обробник пошуку, який скидає сторінку на 1
  const handleSearchChange = (value: string) => {
    setSearch(value);
    setPage(1);
  };

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
        {/* ВИМОГА МЕНТОРА: SearchBox з обробником */}
        <SearchBox value={search} onChange={handleSearchChange} />

        {/* ВИМОГА МЕНТОРА: Link до створення нотатки */}
        <Link
          href="/notes/action/create"
          style={{
            padding: '10px 20px',
            backgroundColor: '#0070f3',
            color: 'white',
            borderRadius: '5px',
            textDecoration: 'none',
          }}
        >
          Add Note +
        </Link>
      </div>

      {isLoading ? (
        <p>Loading notes...</p>
      ) : (
        <>
          {hasNotes ? (
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
        </>
      )}
    </div>
  );
}
