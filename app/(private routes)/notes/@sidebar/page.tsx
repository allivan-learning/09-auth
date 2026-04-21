'use client';

import Link from 'next/link';
import css from './Sidebar.module.css';

export default function SidebarPage() {
  return (
    <nav className={css.sidebarNav}>
      <ul className={css.menuList}>
        <li className={css.menuItem}>
          <Link href="/notes/filter/all" className={css.menuLink}>
            All notes
          </Link>
        </li>
        <li className={css.menuItem}>
          <Link href="/notes/filter/Work" className={css.menuLink}>
            Work
          </Link>
        </li>
        <li className={css.menuItem}>
          <Link href="/notes/filter/Personal" className={css.menuLink}>
            Personal
          </Link>
        </li>
      </ul>
    </nav>
  );
}
