import useSWR from "swr";
import { useState } from "react";

export default function useSearch() {
  const [searchTerm, setSearchTerm] = useState("");
  const [input, setInput] = useState("");

  // Fetch for suggestions when input field has a value

  const { data: suggestions, error: suggestionsError } = useSWR(
    input ? `/api/search/${input}?isSubmitted=false` : null
  );

  // Fetch for results when search term was submitted

  const { data: filteredEventsData, error: filteredEventsError } = useSWR(
    searchTerm ? `/api/search/${searchTerm}?isSubmitted=true` : null
  );

  // filteredEvents object gets events and the info if fetch found any events (undefined when not fetched yet)

  const filteredEvents = {
    hasResults: filteredEventsData
      ? Boolean(filteredEventsData.length)
      : undefined,
    events: filteredEventsData || [],
  };

  // Handle input in the searchbar will set input new and trigger the suggestions fetch

  function handleInputChange(event) {
    const { value } = event.target;
    setInput(value);
  }

  function debounceInputChange(func, wait) {
    let timeout;

    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };

      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  const debouncedInputChange = debounceInputChange(handleInputChange, 300);

  // Submitting the form will set the search term and trigger event fetch

  function handleSubmit(event) {
    event.preventDefault();
    const { value } = event.target.searchTerm;
    setSearchTerm(value);
  }

  // This error handling has to be improved

  if (suggestionsError || filteredEventsError) {
    suggestionsError
      ? console.error("Error fetching suggestions:", suggestionsError)
      : console.error("Error fetching filtered events:", filteredEventsError);
  }

  return {
    searchTerm,
    filteredEvents,
    handleSubmit,
    suggestions: suggestions || [],
    debouncedInputChange,
  };
}
