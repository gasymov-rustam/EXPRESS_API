import { createContext, ReactNode, useContext, useState } from 'react';

type THEME_VARIANT_TYPE = 'dark' | 'light';

type ThemeContextType = {
  theme: 'dark' | 'light';
};

type ToggleThemeType = () => void;

let toggleTheme: ToggleThemeType | null = null;

const ThemeContext = createContext<ThemeContextType>({
  theme: 'dark',
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
  const currentTheme = storedTheme ? storedTheme : 'dark';

  const [theme, setTheme] = useState<THEME_VARIANT_TYPE>(currentTheme);

  toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
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
