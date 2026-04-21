// app/notes/create/page.tsx
import NoteForm from '../../../../components/NoteForm/NoteForm';
import Link from 'next/link';

export default function CreateNotePage() {
  return (
    <div className="max-w-2xl mx-auto mt-10">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Новая заметка</h1>
        <Link href="/" className="text-gray-500 hover:underline">
          Отмена
        </Link>
      </div>
      <NoteForm />
    </div>
  );
}
