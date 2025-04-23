import { createContext, useContext, useEffect, useState } from "react";
import { defaultFont, defaultTheme } from "../assets/contants/index";

const ThemeContext = createContext({});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState(defaultTheme);
  const [font, setFont] = useState(defaultFont);

  useEffect(() => {
    if (theme == "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ setTheme, font, theme, setFont }}>
      <main className={`${font} transition-all`}>{children}</main>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  return useContext(ThemeContext);
};
