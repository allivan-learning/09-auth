import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getMe } from '../../../lib/api/serverApi'; // Тільки серверне API!
import css from './ProfilePage.module.css';

// ВИМОГА: Додавання метаданих
export const metadata: Metadata = {
  title: 'Profile | NoteHub',
  description: 'View your profile details',
};

export default async function Profile() {
  // ВИМОГА: Отримання даних на сервері
  // Якщо запит впаде (401), middleware вже мав нас відсікти,
  // але серверний fetch — це найнадійніший спосіб.
  const user = await getMe();

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
            priority // Бажано для LCP зображень
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
