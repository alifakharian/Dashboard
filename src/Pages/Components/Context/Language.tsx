import React, { createContext, useContext, ReactNode } from "react";
import { useLocalStorage } from "../App/hook/useLocalStorage";

type Language = "fa" | "En" | "fr" | "de";

interface LanguageContextType {
  currentLanguage: Language;
  changeLanguage: (lang: Language) => void;
}

const Contextlanguage = createContext<LanguageContextType | undefined>(
  undefined
);

export const useLancontext = (): LanguageContextType => {
  const context = useContext(Contextlanguage);
  if (!context) {
    throw new Error("useLancontext must be used within a Language provider");
  }
  return context;
};

interface LanguageProps {
  children: ReactNode;
}

const Language: React.FC<LanguageProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useLocalStorage<Language>(
    "selectedLanguage",
    "fa"
  );

  const changeLanguage = (lang: Language) => {
    setCurrentLanguage(lang);
  };

  return (
    <Contextlanguage.Provider value={{ currentLanguage, changeLanguage }}>
      {children}
    </Contextlanguage.Provider>
  );
};

export { Contextlanguage, Language };
