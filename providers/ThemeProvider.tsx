import React, { createContext, useContext, ReactNode } from 'react';
import theme, { Theme } from '../theme';

const ThemeContext = createContext<Theme>(theme);

export const useTheme = (): Theme => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used inside a ThemeProvider');
  }
  return context;
};


interface ThemeProviderProps {
  children: ReactNode;
  customTheme?: Theme;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ 
  children, 
  customTheme 
}) => {

  const currentTheme = customTheme || theme;
  
  return (
    <ThemeContext.Provider value={currentTheme}>
      {children}
    </ThemeContext.Provider>
  );
};