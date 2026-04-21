import { create } from 'zustand';

interface Note {
  id: string;
  title: string;
  content: string;
  tag: string;
  createdAt: string;
}

interface NoteState {
  notes: Note[];
  setNotes: (notes: Note[]) => void;
  clearNotes: () => void;
}

export const useNoteStore = create<NoteState>((set) => ({
  notes: [],
  setNotes: (notes) => set({ notes }),
  clearNotes: () => set({ notes: [] }),
}));
