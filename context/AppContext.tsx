import React, { createContext, useContext, useState, ReactNode } from 'react';

interface AppContextProps {
  solidityCode: string;
  setSolidityCode: (code: string) => void;
  bytecode: string;
  setBytecode: (code: string) => void;
  
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [solidityCode, setSolidityCode] = useState("");
  const [bytecode, setBytecode] = useState("");
  

  return (
    <AppContext.Provider value={{ solidityCode, setSolidityCode, bytecode, setBytecode }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
