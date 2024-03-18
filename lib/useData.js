import { createContext, useContext } from "react";
import useSWR from "swr";

const DataContext = createContext();
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  // Fetch categories

  const {
    data: categories,
    isLoading: isLoadingCategories,
    error: errorCategories,
  } = useSWR("/api/categories", fetcher);

  const fetchedCategories = {
    categories,
    isLoadingCategories,
    errorCategories,
  };

  return (
    <DataContext.Provider value={{ fetchedCategories }}>
      {children}
    </DataContext.Provider>
  );
};
