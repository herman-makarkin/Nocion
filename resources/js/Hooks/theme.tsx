import { cn } from '@/lib/utils';
import { create } from 'zustand';

type ThemeStore = {
    isDark: boolean;
    onDark: () => void;
    onLight: () => void;
    toggle: () => void;
}


export const useTheme = create<ThemeStore>((set, get) => ({
    isDark: false,
    onDark: () => {
        document.body.classList.add('dark');
        return set({ isDark: true })
    },
    onLight: () => {
        document.body.classList.remove('dark');
        set({ isDark: false })
    },
    toggle: () => {
        if (get().isDark)
            document.body.classList.remove('dark');
        else
            document.body.classList.add('dark');

        return set({ isDark: !get().isDark })
    },
}));
