import React, { createContext, useContext, useEffect, ReactNode } from "react";
import { useLocalStorage } from "../App/hook/useLocalStorage";

interface DarkModeContextType {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const Contextdarkmode = createContext<DarkModeContextType | undefined>(
  undefined
);

export const useDarkmodecontext = (): DarkModeContextType => {
  const context = useContext(Contextdarkmode);
  if (!context) {
    throw new Error(
      "useDarkmodecontext must be used within a Darkmode provider"
    );
  }
  return context;
};

interface DarkmodeProps {
  children: ReactNode;
}

const Darkmode: React.FC<DarkmodeProps> = ({ children }) => {
  const [darkMode, setDarkMode] = useLocalStorage<boolean>("darkMode", false);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <Contextdarkmode.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </Contextdarkmode.Provider>
  );
};

export { Contextdarkmode, Darkmode };
