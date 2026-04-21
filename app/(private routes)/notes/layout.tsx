'use client';

import styles from './Notes.module.css';

// Обрати внимание: мы убрали PrivateRoute, так как AuthProvider уже защищает всё приложение!
export default function NotesLayout({
  children,
  sidebar,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode; // Это пропс для папки @sidebar
}) {
  return (
    <div className={styles.notesLayout}>
      {/* Сюда Next.js автоматически вставит содержимое папки @sidebar */}
      <aside className={styles.sidebarColumn}>{sidebar}</aside>

      {/* Сюда будут рендериться сами заметки (список или создание) */}
      <main className={styles.contentColumn}>{children}</main>
    </div>
  );
}
