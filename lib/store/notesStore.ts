import { create } from 'zustand';
import { api } from '../api/api'; // Наш настроенный Axios

interface Note {
  id: string;
  title: string;
  content: string;
}

interface NotesState {
  items: Note[];
  isLoading: boolean;
  filter: string;

  // Методы
  setFilter: (filter: string) => void;
  fetchNotes: () => Promise<void>;
  addNote: (note: { title: string; content: string }) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
}

export const useNotesStore = create<NotesState>((set, get) => ({
  items: [],
  isLoading: false,
  filter: '',

  setFilter: (filter) => set({ filter }),

  // 1. ПОЛУЧЕНИЕ ЗАМЕТОК С СЕРВЕРА
  fetchNotes: async () => {
    set({ isLoading: true });
    try {
      const response = await api.get('/notes');
      set({ items: response.data });
    } finally {
      set({ isLoading: false });
    }
  },

  // 2. ДОБАВЛЕНИЕ (Сначала на сервер, потом в стейт)
  addNote: async (newNote) => {
    const response = await api.post('/notes', newNote);
    // Сервер вернет созданную заметку с уже готовым ID
    set({ items: [...get().items, response.data] });
  },

  // 3. УДАЛЕНИЕ
  deleteNote: async (id) => {
    await api.delete(`/notes/${id}`);
    set({ items: get().items.filter((note) => note.id !== id) });
  },
}));
