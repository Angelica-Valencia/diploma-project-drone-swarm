import React, { useState } from 'react';
import ThemeContext from './ThemeContext';

function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark');

  const toggleDarkTheme = () => {
    setTheme('dark');
  };

  const toggleMediumTheme = () => {
    setTheme('medium');
  };

  const toggleLightTheme = () => {
    setTheme('light');
  };

  const themeContextValue = {
    theme,
    toggleDarkTheme,
    toggleMediumTheme,
    toggleLightTheme,
  };

  return (
    <ThemeContext.Provider value={themeContextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;
