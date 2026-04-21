'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '../../../lib/store/authStore';
import { getErrorMessage } from '../../../lib/utils/handleError';
import css from './SignUpPage.module.css';

// ВАЖНО: Если тут будет ошибка пути, удали строку ниже,
// напиши слово register в коде и нажми Ctrl + Space (или Cmd + Space), чтобы IDE сама нашла путь!
import { register, RegisterRequest } from '../../../lib/api/clientApi';

export default function SignUp() {
  const router = useRouter();
  const [error, setError] = useState('');

  // Достаем функцию для записи юзера в стор
  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    const formData = new FormData(e.currentTarget);
    const formValues = Object.fromEntries(
      formData,
    ) as unknown as RegisterRequest;

    try {
      const res = await register(formValues);

      if (res) {
        // 1. Сначала записываем юзера в глобальный стейт, чтобы AuthProvider нас пропустил
        setUser(res);
        // 2. Делаем редирект строго на профиль (как требует ТЗ)
        router.push('/profile');
      }
    } catch (err) {
      setError(getErrorMessage(err));
    }
  };

  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>

      <form className={css.form} onSubmit={handleSubmit}>
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
            placeholder="example@mail.com"
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
            minLength={6}
            placeholder="Минимум 6 символов"
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Register
          </button>
        </div>

        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
}
