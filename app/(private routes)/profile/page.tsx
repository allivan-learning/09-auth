'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useAuthStore } from '../../../lib/store/authStore';
// Замени 'ProfilePage.module.css' на точное название файла стилей из репозитория GoIT
import css from './ProfilePage.module.css';

export default function Profile() {
  const { user } = useAuthStore();

  // Если юзера еще нет в стейте (например, идет загрузка), AuthProvider
  // всё равно нас защищает, но чтобы не было ошибок рендера:
  if (!user) return null;

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={user.avatar}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>
            Username: <strong>{user.username}</strong>
          </p>
          <p>
            Email: <strong>{user.email}</strong>
          </p>
        </div>
      </div>
    </main>
  );
}
