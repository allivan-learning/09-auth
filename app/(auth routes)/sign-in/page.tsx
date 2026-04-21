'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login, LoginRequest } from '../../../lib/api/clientApi';
import { useAuthStore } from '../../../lib/store/authStore';
import { getErrorMessage } from '../../../lib/utils/handleError'; // Импортируем наш хендлер

import css from './SignInPage.module.css';

export default function SignIn() {
  const router = useRouter();
  const [error, setError] = useState('');
  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    const formData = new FormData(e.currentTarget);
    const formValues = Object.fromEntries(formData) as unknown as LoginRequest;

    try {
      const res = await login(formValues);
      if (res) {
        // Если бекенд при регистрации сразу логинит юзера (отдает куки),
        // нам нужно записать его в Zustand-стор, чтобы AuthProvider пустил нас на /profile
        // Добавь импорт: import { useAuthStore } from '../../../lib/store/authStore';
        // Добавь в компонент: const setUser = useAuthStore((state) => state.setUser);
        setUser(res);
        router.push('/profile');
      }
    } catch (err) {
      // Вместо жесткого текста теперь выводим то, что прислал сервер
      const message = getErrorMessage(err);
      setError(message);
    }
  };

  return (
    <main className={css.mainContent}>
      <form onSubmit={handleSubmit} className={css.form}>
        <h1 className={css.formTitle}>Sign in</h1>

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
            placeholder="Enter your password"
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Log in
          </button>
        </div>

        {/* Сюда теперь будут прилетать детальные ошибки: 
            от "Email is required" до "Invalid password" */}
        {error && <p className={css.error}>{error}</p>}
      </form>
    </main>
  );
}
