import {
  createContext,
  useState,
  useMemo,
  useContext,
  useEffect,
  memo,
} from 'react';

const storedTheme = localStorage.getItem('theme') || 'light';

const ThemeContext = createContext();

const ThemeProvider = memo(({ initialTheme = storedTheme, children }) => {
  const [theme, setTheme] = useState(initialTheme);

  useEffect(() => localStorage.setItem('theme', theme), [theme]);

  const value = useMemo(
    () => ({
      theme,
      toggleTheme: () =>
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light')),
    }),
    [theme],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
});

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw Error('ThemeContext need to be used in a ThemeProvider');
  return context;
};

export { ThemeProvider, useTheme };
