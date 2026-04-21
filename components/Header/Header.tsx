import Link from 'next/link';
import { AuthNavigation } from '../AuthNavigation/AuthNavigation'; // Путь может отличаться!
import css from './Header.module.css';

export default function Header() {
  return (
    <header className={css.header}>
      <div className={css.container}>
        {' '}
        {/* Добавим контейнер для красоты, если он есть в CSS */}
        <Link href="/" className={css.logo}>
          NoteHub
        </Link>
        <nav aria-label="Main Navigation">
          <ul className={css.navigation}>
            <li>
              <Link href="/" className={css.navigationLink}>
                Home
              </Link>
            </li>

            {/* Здесь мы убираем старую ссылку /notes/filter/all. 
               Вместо этого мы используем наш умный AuthNavigation.
               Он сам добавит ссылку на Notes и Profile, если юзер залогинен.
            */}
            <AuthNavigation />
          </ul>
        </nav>
      </div>
    </header>
  );
}
