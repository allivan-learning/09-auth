'use client';

import { useRouter } from 'next/navigation';
import { use } from 'react';

// Выходим из [id] -> (.)notes -> @modal и заходим в обычную папку notes
import NoteDetailsClient from '../../../notes/[id]/NoteDetails.client';
// Если твой Modal лежит в корневой components, то выходим еще на уровень выше:
import Modal from '../../../../../components/Modal/Modal';

export default function InterceptedNoteModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const { id } = use(params);

  return (
    <Modal onClose={() => router.back()}>
      <div
        style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '10px',
          minWidth: '400px',
          maxWidth: '600px',
          maxHeight: '80vh',
          overflowY: 'auto',
        }}
      >
        {/* Вот она! Мы берем её из соседней папки, а не создаем копию */}
        <NoteDetailsClient id={id} />
      </div>
    </Modal>
  );
}
