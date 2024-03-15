import { createContext, useContext, useState, useEffect } from "react";
import useSWR from "swr";

const DataContext = createContext();

export const Data = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch("/api/categories");
      const categories = await response.json();
      setCategories(categories);
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch("/api/events");
      const events = await response.json();
      setEvents(events);
    };

    fetchEvents();

    const intervalId = setInterval(fetchEvents, 5 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, []);

  function getCategoryBySlug(slug) {
    const [category] = categories.filter((cat) => cat.slug === slug);
    return category;
  }

  return (
    <DataContext.Provider value={{ events, categories, getCategoryBySlug }}>
      {children}
    </DataContext.Provider>
  );
};

export function useFindEventByID(id) {
  const { data, error, isLoading } = useSWR(id ? `/api/events/${id}` : null);
  return { event: data, isLoading, error };
}
