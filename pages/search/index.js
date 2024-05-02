import SearchCard from "@/components/Search/SearchCard";
import EventList from "@/components/EventList/EventList";
import useSearch from "@/lib/useSearch";
import { useEffect, useState } from "react";

function isAnyValueTrue(obj) {
  for (const key in obj) {
    if (obj[key] === true) {
      return true;
    }
  }
  return false;
}

export default function SearchPage() {
  const {
    searchTerm,
    filteredEvents,
    handleSubmit,
    suggestions,
    debouncedInputChange,
  } = useSearch();

  const [a11yFilter, setA11yFilter] = useState({});
  const [events, setEvents] = useState([]);
  const [isFiltered, setIsFiltered] = useState(isAnyValueTrue(a11yFilter));
  const [title, setTitle] = useState(null);

  // Set the event list title based on the search results
  useEffect(() => {
    const count = isFiltered ? events.length : filteredEvents.events.length;
    let newTitle = "";
    if (
      (filteredEvents.hasResults && isFiltered === false) ||
      (isFiltered === true && events.length > 0)
    ) {
      newTitle = `Deine Suchergebnisse für "${searchTerm}" (${count})`;
    } else {
      newTitle = `Deine Suche nach" "${searchTerm}" ergab leider kein Ergebnis.`;
    }
    if (filteredEvents.hasResults === undefined) {
      newTitle = null;
    }
    setTitle(newTitle);
  }, [filteredEvents.hasResults, events, isFiltered]);

  // Reset the filter when a new searchTerm is submitted
  useEffect(() => {
    setA11yFilter({});
  }, [searchTerm]);

  // Filter events based on a11yIcon selection
  useEffect(() => {
    const currentEvents = [...filteredEvents.events];
    const currentEventsFiltered = currentEvents.filter((event) => {
      let isIncluded = false;
      const a11yIcons = event.a11yIcons || [];
      a11yIcons.forEach((id) => {
        if (a11yFilter[id] === true) {
          isIncluded = true;
        }
      });
      return isIncluded;
    });
    setEvents(currentEventsFiltered);
    setIsFiltered(isAnyValueTrue(a11yFilter));
  }, [a11yFilter]);

  return (
    <>
      <SearchCard
        handleSubmit={handleSubmit}
        debouncedInputChange={debouncedInputChange}
        suggestions={suggestions}
        hasResults={filteredEvents.hasResults}
        a11yFilter={a11yFilter}
        setA11yFilter={setA11yFilter}
        events={events}
        isFiltered={isFiltered}
      />

      <EventList
        events={isFiltered ? events : filteredEvents.events}
        isSorted
        title={title}
      />
    </>
  );
}
