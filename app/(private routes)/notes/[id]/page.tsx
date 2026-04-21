import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { Metadata } from 'next';
// 👇 ИСПРАВЛЕННАЯ СТРОКА: используем @/ вместо ../../../../
import { fetchNoteById } from '../../../lib/api/serverApi';
import NoteDetailsClient from './NoteDetails.client';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  try {
    const note = await fetchNoteById(id);

    const title = `${note.title} | NoteHub`;
    const description =
      note.content.length > 150
        ? `${note.content.substring(0, 150)}...`
        : note.content;

    return {
      title,
      description,
      openGraph: {
        title,
        description,
        url: `https://note-hub-five.vercel.app/notes/${id}`,
        images: [
          {
            url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
            width: 1200,
            height: 630,
            alt: note.title,
          },
        ],
      },
    };
  } catch {
    return {
      title: 'Нотатка не знайдена | NoteHub',
      description: 'Запитувана нотатка не існує.',
    };
  }
}

export default async function NotePage({ params }: Props) {
  const { id } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['note', id],
    queryFn: () => fetchNoteById(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NoteDetailsClient id={id} />
    </HydrationBoundary>
  );
}
