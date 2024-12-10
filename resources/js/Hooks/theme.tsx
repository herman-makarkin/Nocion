import { create } from 'zustand';

type ThemeStore = {
    isDark: boolean;
    onDark: () => void;
    onLight: () => void;
    toggle: () => void;
}

export const useTheme = create<ThemeStore>((set, get) => ({
    isDark: false,
    onDark: () => set({ isDark: true }),
    onLight: () => set({ isDark: false }),
    toggle: () => set({ isDark: !get().isDark }),
}));
