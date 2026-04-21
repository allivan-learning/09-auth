'use client';

// Убедись, что путь к CSS правильный. Если Notes.module.css лежит на уровень выше, то путь такой:
import styles from '../Notes.module.css';

export default function FilterLayout({
  children,
  sidebar,
}: {
  children: React.ReactNode;
  sidebar: React.ReactNode; // Теперь сайдбар ожидается здесь!
}) {
  return (
    <div className={styles.notesLayout}>
      <aside className={styles.sidebarColumn}>{sidebar}</aside>
      <main className={styles.contentColumn}>{children}</main>
    </div>
  );
}
