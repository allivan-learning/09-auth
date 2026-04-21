import NotesClient from './Notes.client';

// Описываем тип параметров страницы
type Props = {
  params: Promise<{ slug: string[] }>;
};

export default async function NotesPage({ params }: Props) {
  // Дожидаемся параметров (фишка Next.js 15)
  const resolvedParams = await params;
  const tag = resolvedParams.slug ? resolvedParams.slug[0] : 'all';

  return (
    <main
      style={{ width: '100%', minHeight: '100vh', backgroundColor: 'white' }}
    >
      <h1 style={{ color: 'black', padding: '20px' }}>
        Секція нотаток (Тег: {tag})
      </h1>
      <NotesClient tag={tag} />
    </main>
  );
}
