import { createContext, useContext } from "react";

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  return (
    <DataContext.Provider value={{ foo }}>{children}</DataContext.Provider>
  );
};
