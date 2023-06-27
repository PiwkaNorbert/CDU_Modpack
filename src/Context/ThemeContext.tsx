import { createContext } from 'react';

export type ThemeContextType = {
  theme: boolean,
  setTheme: (theme: boolean) => void,
};

// create a context for the theme (light or dark)
export const ThemeContext = createContext<ThemeContextType>({
  // theme default from window match media (dark mode if user preference is dark) or local storage
  theme: false,
  setTheme: () => {},
 
});

// Path: ThemeContext.tsx
import React, { useState, useEffect } from 'react';
import { UserProviderProps } from '../Utils/Types';

export const ThemeProvider: React.FC<UserProviderProps> = ({
  children
}) =>{
  // get theme from local storage and set the state to it
  const [theme, setTheme] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark' || (!storedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setTheme(true);
    }
  }, []);

  useEffect(() => {
    if (theme) {
      document.documentElement.setAttribute("data-theme",'dark');
      document.documentElement.classList.add('dark');

      document.documentElement.classList.remove('light');

      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');

      document.documentElement.setAttribute("data-theme",'light');


      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

