import React from 'react';

const ThemeContext = React.createContext({
  theme: 'medium',
  toggleDarkTheme: () => {},
  toggleMediumTheme: () => {},
  toggleLightTheme: () => {},
});

export default ThemeContext;