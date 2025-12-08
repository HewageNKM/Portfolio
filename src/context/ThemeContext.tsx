"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { defaultFont, defaultTheme } from "../assets/contants/index";

interface ThemeContextProps {
  theme: string;
  setTheme: (theme: string) => void;
  font: string;
  setFont: (font: string) => void;
}

const ThemeContext = createContext<ThemeContextProps>({
  theme: defaultTheme,
  setTheme: () => {},
  font: defaultFont,
  setFont: () => {},
});

const getDefaultTheme = () => {
  return typeof window !== "undefined"
    ? window.localStorage.getItem("NMTheme") || defaultTheme
    : defaultTheme;
};

const getDefaultFont = () => {
  return typeof window !== "undefined"
    ? window.localStorage.getItem("NMFont") || defaultFont
    : defaultFont;
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState(getDefaultTheme());
  const [font, setFont] = useState(getDefaultFont());

  const setEffectiveTheme = (newTheme: string) => {
    setTheme(newTheme);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("NMTheme", newTheme);
    }
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const setEffectiveFont = (newFont: string) => {
    setFont(newFont);
    if (typeof window !== "undefined") {
      window.localStorage.setItem("NMFont", newFont);
    }
  };

  // Initialize theme and font on mount
  useEffect(() => {
    setEffectiveTheme(getDefaultTheme());
    setEffectiveFont(getDefaultFont());
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme: setEffectiveTheme,
        font,
        setFont: setEffectiveFont,
      }}
    >
      <main className={`${font} transition-all`}>{children}</main>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  return useContext(ThemeContext);
};
