import { createContext, useContext, useCallback } from "react";
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

  // Fetch Events refreshing every two Minutes
  const {
    data: events,
    isLoading: isLoadingEvents,
    error: errorEvents,
    mutate: mutateEvents,
  } = useSWR("/api/events", fetcher, { refreshInterval: 2 * 60 * 1000 });

  const fetchedEvents = {
    events,
    isLoadingEvents,
    errorEvents,
  };

  const filterEventsByCategoryID = useCallback(
    (categoryID) => {
      return events.filter((ev) => ev.category._id === categoryID);
    },
    [events]
  );

  return (
    <DataContext.Provider
      value={{ fetchedCategories, fetchedEvents, filterEventsByCategoryID }}
    >
      {children}
    </DataContext.Provider>
  );
};
