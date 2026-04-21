import { create } from 'zustand';
import { api } from '../api/api';

interface Note {
  id: string;
  title: string;
  content: string;
}

interface NotesState {
  notes: Note[];
  isLoading: boolean;
  filter: string;

  // Методы
  setFilter: (value: string) => void;
  fetchNotes: () => Promise<void>;
  addNote: (data: { title: string; content: string }) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
}

export const useNotesStore = create<NotesState>((set, get) => ({
  notes: [],
  isLoading: false,
  filter: '',

  setFilter: (value) => set({ filter: value }),

  // Получаем заметки с сервера
  fetchNotes: async () => {
    set({ isLoading: true });
    try {
      const { data } = await api.get('/notes');
      set({ notes: data });
    } catch (error) {
      console.error('Ошибка при загрузке заметок', error);
    } finally {
      set({ isLoading: false });
    }
  },

  // Добавляем новую
  addNote: async (newNote) => {
    try {
      const { data } = await api.post('/notes', newNote);
      // Сервер возвращает созданную заметку с уже присвоенным ID
      set({ notes: [...get().notes, data] });
    } catch (error) {
      console.error('Не удалось добавить заметку', error);
    }
  },

  // Удаляем
  deleteNote: async (id) => {
    try {
      await api.delete(`/notes/${id}`);
      set({ notes: get().notes.filter((n) => n.id !== id) });
    } catch (error) {
      console.error('Ошибка удаления', error);
    }
  },
}));
