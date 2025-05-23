
import { createContext, useContext, useEffect, useState } from "react";
import { useLocalStorage } from "../hooks/use-local-storage";

// Define the props for the ThemeProvider component
interface ThemeProviderProps {
  children: React.ReactNode;
}

// Define the type for the theme context
interface ThemeContextType {
  theme: string;
  setTheme: (theme: string) => void;
}

// Create the theme context
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Create the ThemeProvider component
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useLocalStorage<string>("vite-ui-theme", "light");

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Create the useTheme custom hook
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
