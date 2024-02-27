import { createContext, ReactNode, useContext, useState } from 'react';

export enum THEME_VARIANT_TYPE {
  DARK = 'dark',
  LIGHT = 'light',
}

type ThemeContextType = {
  theme: THEME_VARIANT_TYPE;
};

type ToggleThemeType = () => void;

let toggleTheme: ToggleThemeType | null = null;

const ThemeContext = createContext<ThemeContextType>({
  theme: THEME_VARIANT_TYPE.DARK,
});

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return { theme: context, toggleTheme };
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const storedTheme = localStorage.getItem('theme') as THEME_VARIANT_TYPE | null;
  const currentTheme = storedTheme ? storedTheme : THEME_VARIANT_TYPE.DARK;

  const [theme, setTheme] = useState<THEME_VARIANT_TYPE>(currentTheme);

  toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === THEME_VARIANT_TYPE.LIGHT ? THEME_VARIANT_TYPE.DARK : THEME_VARIANT_TYPE.LIGHT;
      localStorage.setItem('theme', newTheme);

      return newTheme;
    });
  };

  return (
    <ThemeContext.Provider value={{ theme }}>
      <main className={`${theme} text-foreground bg-background`}>{children}</main>
    </ThemeContext.Provider>
  );
};
