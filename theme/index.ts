import palette from './colors';
import spacing from './spacing';
import typography from './typography';

export const theme = {
    colors: palette,
    spacing,
    typography,
    shadows: {
      sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
      md: '0 4px 6px rgba(0, 0, 0, 0.1)',
      lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
      xl: '0 20px 25px rgba(0, 0, 0, 0.15)',
    },
    borderRadius: {
      sm: 4,
      md: 8,
      lg: 12,
      xl: 16,
      round: 9999,
    },
  };
  
  export type Theme = typeof theme;

export default theme;