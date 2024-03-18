import { createContext, useContext } from "react";
import useSWR from "swr";

const DataContext = createContext();
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  // Fetch categories

  const { data, isLoading, error } = useSWR("/api/categories", fetcher);
  const categories = { data, isLoading, error };

  return (
    <DataContext.Provider value={{ categories }}>
      {children}
    </DataContext.Provider>
  );
};
