import { create } from "zustand";

type Theme = "light" | "dark";

interface ThemeState {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  // 1. Estado inicial (lê do localStorage ou usa 'light' como padrão)
  theme: (localStorage.getItem("app-theme") as Theme) || "light",

  // 2. Função para alternar entre os temas
  toggleTheme: () =>
    set((state) => {
      const newTheme = state.theme === "light" ? "dark" : "light";
      localStorage.setItem("app-theme", newTheme);
      return { theme: newTheme };
    }),

  // 3. Função para definir o tema
  setTheme: (theme: Theme) =>
    set(() => {
      localStorage.setItem("app-theme", theme);
      return { theme };
    }),
}));
