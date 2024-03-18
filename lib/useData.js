import { createContext, useContext } from "react";
import useSWR from "swr";

const DataContext = createContext();
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const { data: categories } = useSWR("/api/categories", fetcher);

  return (
    <DataContext.Provider value={{ categories }}>
      {children}
    </DataContext.Provider>
  );
};
