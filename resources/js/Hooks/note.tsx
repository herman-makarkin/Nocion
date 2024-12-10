import { Note } from '@/types';
import { create } from 'zustand';

type NoteStore = {
    note: Note | null;
    setNote: (arg0: Note) => void;
}

export const useNote = create<NoteStore>((set, get) => ({
    note: null,
    setNote: (value: Note) => set({ note: value })
}));
