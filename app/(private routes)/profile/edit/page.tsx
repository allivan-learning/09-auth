'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image'; // ТЗ: використовуйте компонент Image від Next.js
import { useAuthStore } from '../../../../lib/store/authStore';
import { updateMe } from '../../../../lib/api/clientApi';
// Импортируй правильный CSS-модуль из репозитория
import css from './EditProfilePage.module.css';

export default function EditProfile() {
  const router = useRouter();
  const { user, setUser } = useAuthStore();

  // Кладем текущее имя пользователя в локальный стейт формы
  const [username, setUsername] = useState(user?.username || '');
  const [isSaving, setIsSaving] = useState(false);

  // Защита от пустого рендера
  if (!user) return null;

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      // Отправляем на сервер только то поле, которое изменилось
      const updatedUser = await updateMe({ username });

      // Обновляем глобальный стейт, чтобы везде отобразилось новое имя
      setUser(updatedUser);

      // ТЗ: У разі успішного оновлення має виконуватися редірект
      router.push('/profile');
    } catch (error) {
      console.error('Ошибка при обновлении профиля', error);
      alert('Не удалось обновить профиль');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    // ТЗ: При натисканні на Cancel користувач повинен повернутися назад
    router.push('/profile');
  };

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={user.avatar}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
          priority // Хорошая практика для картинок, которые видно сразу
        />

        <form className={css.profileInfo} onSubmit={handleSave}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username:</label>
            <input
              id="username"
              type="text"
              className={css.input}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          {/* ТЗ: Email відображається у вигляді звичайного тексту */}
          <p>Email: {user.email}</p>

          <div className={css.actions}>
            <button
              type="submit"
              className={css.saveButton}
              disabled={isSaving}
            >
              {isSaving ? 'Saving...' : 'Save'}
            </button>
            <button
              type="button"
              className={css.cancelButton}
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
