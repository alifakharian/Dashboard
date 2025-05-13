import React, { createContext, useContext, ReactNode, useState } from "react";
import { useLocalStorage } from "../App/hook/useLocalStorage";
import { v4 as uuidv4 } from "uuid";

interface Translation {
  fr: string;
  de: string;
  En: string;
}

interface Word {
  id: string;
  word: string;
  translations: Translation;
}

type Twords = Word[];

interface WordsContextType {
  keywords: Twords;
  input: string;
  inputhandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setKeywords: React.Dispatch<React.SetStateAction<Twords>>;
  handleAddWord: () => void;
  handleDeleteWord: (id: string) => void;
  handleEditTranslation: (
    id: string,
    language: keyof Translation,
    newTranslation: string
  ) => void;
}

const Contextwords = createContext<WordsContextType | undefined>(undefined);

export const useWordcontext = (): WordsContextType => {
  const context = useContext(Contextwords);
  if (!context) {
    throw new Error("useWordcontext must be used within a Words provider");
  }
  return context;
};

interface WordsProps {
  children: ReactNode;
}

const Words: React.FC<WordsProps> = ({ children }) => {
  const [keywords, setKeywords] = useLocalStorage<Twords>("keywords", [
    {
      id: "1",
      word: "سلام",
      translations: {
        de: "Hallo",
        fr: "bonjour",
        En: "Hello",
      },
    },
    {
      id: "2",
      word: "دنیا",
      translations: {
        de: "Welt",
        fr: "monde",
        En: "World",
      },
    },
    {
      id: "3",
      word: "کتاب",
      translations: {
        de: "Buch",
        fr: "livre",
        En: "Book",
      },
    },
    {
      id: "4",
      word: "سیب",
      translations: {
        de: "Apfel",
        fr: "pomme",
        En: "Apple",
      },
    },
  ]);

  const [input, setinput] = useState<string>("");

  const inputhandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setinput(e.target.value);
  };

  const handleAddWord = () => {
    if (input.trim() !== "") {
      const newEntry: Word = {
        id: uuidv4(),
        word: input,
        translations: {
          fr: "_",
          de: "_",
          En: "_",
        },
      };
      setKeywords([...keywords, newEntry]);
      setinput("");
    }
  };

  const handleDeleteWord = (id: string) => {
    setKeywords((prev) => prev.filter((word) => word.id !== id));
  };

  const handleEditTranslation = (
    id: string,
    language: keyof Translation,
    newTranslation: string
  ) => {
    const updatedKeywords = keywords.map((keyword) => {
      if (keyword.id === id) {
        return {
          ...keyword,
          translations: {
            ...keyword.translations,
            [language]: newTranslation,
          },
        };
      }
      return keyword;
    });
    setKeywords(updatedKeywords);
  };

  //   };

  return (
    <Contextwords.Provider
      value={{
        keywords,
        setKeywords,
        inputhandler,
        input,
        handleAddWord,
        handleDeleteWord,
        handleEditTranslation,
      }}
    >
      {children}
    </Contextwords.Provider>
  );
};

export { Contextwords, Words };
