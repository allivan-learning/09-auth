import { create } from 'zustand';
import { User } from '../../types/user'; // Импортируем тип юзера из нашего API

// 1. Описываем, как выглядит наша записная книжка
interface AuthState {
  user: User | null; // Тут будут лежать данные (имя, почта, аватар)
  isAuthenticated: boolean; // Простой флажок: залогинен (true) или нет (false)

  // А это "ручки", которыми мы будем писать в книжку:
  setUser: (user: User) => void;
  clearIsAuthenticated: () => void;
}

// 2. Создаем саму книжку
export const useAuthStore = create<AuthState>()((set) => ({
  // Стартовые значения (когда человек только зашел на сайт)
  user: null,
  isAuthenticated: false,

  // Функция "Записать юзера"
  setUser: (user) => set({ user: user, isAuthenticated: true }),

  // Функция "Стереть юзера" (при выходе)
  clearIsAuthenticated: () => set({ user: null, isAuthenticated: false }),
}));
