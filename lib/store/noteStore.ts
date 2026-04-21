import { create } from 'zustand';

// Описуємо структуру чернетки нотатки
interface NoteDraftState {
  title: string;
  content: string;
  tag: string;
  // Методи для оновлення полів
  setTitle: (title: string) => void;
  setContent: (content: string) => void;
  setTag: (tag: string) => void;
  // Метод для очищення форми після успіху
  resetDraft: () => void;
}

export const useNoteStore = create<NoteDraftState>((set) => ({
  title: '',
  content: '',
  tag: 'Todo', // Значення за замовчуванням

  setTitle: (title) => set({ title }),
  setContent: (content) => set({ content }),
  setTag: (tag) => set({ tag }),

  resetDraft: () =>
    set({
      title: '',
      content: '',
      tag: 'Todo',
    }),
}));
