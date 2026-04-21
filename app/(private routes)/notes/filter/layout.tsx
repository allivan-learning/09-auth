import React from 'react';
import css from '../Notes.module.css';

interface LayoutProps {
  children: React.ReactNode; // Это наш центр (page.tsx или [...tag])
  sidebar: React.ReactNode; // ЭТО НАШ САЙДБАР (папка @sidebar)
}

export default function FilterLayout({ children, sidebar }: LayoutProps) {
  return (
    <div
      className={css.container}
      style={{ display: 'flex', gap: '30px', padding: '20px' }}
    >
      {/* 1. ЛЕВАЯ КОЛОНКА */}
      <aside style={{ width: '250px', borderRight: '1px solid #ddd' }}>
        {/* ВАЖНО: Без этой строчки сайдбар не появится! */}
        {sidebar}
      </aside>

      {/* 2. ПРАВАЯ КОЛОНКА */}
      <main style={{ flexGrow: 1 }}>{children}</main>
    </div>
  );
}
