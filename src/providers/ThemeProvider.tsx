import React, { createContext, useContext, useMemo, ReactNode } from "react";
import { useColorScheme } from "react-native";
import { makeTheme, theme as lightTheme, Theme } from "@/theme";

const ThemeContext = createContext<Theme>(lightTheme);

export const useTheme = (): Theme => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used inside a ThemeProvider");
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
  customTheme?: Theme;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  children,
  customTheme,
}) => {
  const scheme = useColorScheme();

  const currentTheme = useMemo(
    () => customTheme ?? makeTheme(scheme === "dark" ? "dark" : "light"),
    [customTheme, scheme]
  );

  return (
    <ThemeContext.Provider value={currentTheme}>
      {children}
    </ThemeContext.Provider>
  );
};
