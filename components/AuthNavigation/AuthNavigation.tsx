'use client'; // Это важно, так как меню меняется в реальном времени

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { logout } from '../../lib/api/clientApi';
import { useAuthStore } from '../../lib/store/authStore'; // Берем нашу книжку
import css from './AuthNavigation.module.css'; // Подключаем стили

export const AuthNavigation = () => {
  const router = useRouter();

  // ЧИТАЕМ ИЗ КНИЖКИ: Залогинен ли человек? Кто он? И берем ластик, чтобы стирать данные.
  const { isAuthenticated, user, clearIsAuthenticated } = useAuthStore();

  const handleLogout = async () => {
    try {
      await logout(); // 1. Звоним на сервер, аннулируем куку
      clearIsAuthenticated(); // 2. Ластиком стираем данные из Zustand-книжки
      router.push('/sign-in'); // 3. Выкидываем на страницу входа
    } catch (error) {
      console.error('Ошибка при выходе');
    }
  };

  // ЕСЛИ ЧЕЛОВЕК ЗАЛОГИНЕН (Читаем флажок)
  if (isAuthenticated) {
    return (
      <>
        <li className={css.navigationItem}>
          <Link href="/profile" prefetch={false} className={css.navigationLink}>
            Profile
          </Link>
        </li>
        <li className={css.navigationItem}>
          {/* Показываем его почту из глобального стейта */}
          <p className={css.userEmail}>{user?.email}</p>
          <button onClick={handleLogout} className={css.logoutButton}>
            Logout
          </button>
        </li>
      </>
    );
  }

  // ЕСЛИ ЧЕЛОВЕК АНОНИМ (Например, только зашел на сайт)
  return (
    <>
      <li className={css.navigationItem}>
        <Link href="/sign-in" prefetch={false} className={css.navigationLink}>
          Login
        </Link>
      </li>
      <li className={css.navigationItem}>
        <Link href="/sign-up" prefetch={false} className={css.navigationLink}>
          Sign-up
        </Link>
      </li>
    </>
  );
};
