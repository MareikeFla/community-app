import SearchCard from "@/components/Search/SearchCard";
import EventList from "@/components/EventList/EventList";
import useSearch from "@/lib/useSearch";
import { useEffect, useState } from "react";
import { useData } from "@/lib/useData";

function isAnyValueTrue(objOne, objTwo) {
  let result = false;
  for (const key in objOne) {
    if (objOne[key] === true) {
      result = true;
    }
  }
  for (const key in objTwo) {
    if (objTwo[key] === true) {
      result = true;
    }
  }
  return result;
}

export default function SearchPage() {
  const {
    searchTerm,
    filteredEvents,
    handleSubmit,
    suggestions,
    debouncedInputChange,
  } = useSearch();

  const {
    events: fetchedEvents,
    isLoadingEvents,
    errorEvents,
  } = useData().fetchedEvents;

  const [a11yFilter, setA11yFilter] = useState({});
  const [categoryFilter, setCategoryFilter] = useState({});
  const [events, setEvents] = useState([]);
  const [isFiltered, setIsFiltered] = useState(
    isAnyValueTrue(a11yFilter, categoryFilter)
  );
  const [title, setTitle] = useState(null);

  // Set the event list title based on the search results

  useEffect(() => {
    const eventCount = isFiltered
      ? events.length
      : filteredEvents.events.length;
    const searchPerformed = filteredEvents?.hasResults !== undefined;
    const hasResults = eventCount > 0;

    if (!searchPerformed && !isFiltered) {
      setTitle(null);
      return;
    }

    const searchString = searchPerformed ? ` für "${searchTerm}"` : "";
    setTitle(
      hasResults
        ? `Deine Suchergebnisse${searchString} (${eventCount})`
        : `Deine Suche${searchString} ergab leider kein Ergebnis.`
    );
  }, [filteredEvents?.hasResults, events, isFiltered]);

  // Reset the filter when a new searchTerm is submitted
  useEffect(() => {
    setA11yFilter({});
    setCategoryFilter({});
  }, [searchTerm]);

  // Filter events based on a11yIcon selection
  useEffect(() => {
    const hasCategoryFilters = isAnyValueTrue(categoryFilter);
    const hasa11yFilters = isAnyValueTrue(a11yFilter);
    let currentEvents = [...filteredEvents.events];
    if (
      filteredEvents.hasResults === undefined &&
      (hasCategoryFilters || hasa11yFilters)
    ) {
      currentEvents = fetchedEvents;
    }
    if (hasa11yFilters === true) {
      let currentEventsFiltered = currentEvents.filter((event) => {
        let isIncluded = false;
        const a11yIcons = event.a11yIcons || [];
        a11yIcons.forEach((id) => {
          if (a11yFilter[id] === true) {
            isIncluded = true;
          }
        });
        return isIncluded;
      });
      currentEvents = currentEventsFiltered;
    }

    if (hasCategoryFilters === true) {
      const result = currentEvents.filter(
        (event) => categoryFilter[event.category._id] === true
      );
      currentEvents = result;
    }
    if (
      filteredEvents.hasResults === undefined &&
      (hasCategoryFilters || hasa11yFilters) &&
      currentEvents.length > 0
    ) {
      setTitle(`Deine Suchergebnisse (${currentEvents.length})`);
    }

    setEvents(currentEvents);
    setIsFiltered(isAnyValueTrue(a11yFilter, categoryFilter));
  }, [a11yFilter, categoryFilter]);

  if (isLoadingEvents || errorEvents) {
    return;
  }
  return (
    <>
      <SearchCard
        handleSubmit={handleSubmit}
        debouncedInputChange={debouncedInputChange}
        suggestions={suggestions}
        hasSearchTerm={filteredEvents.hasResults !== undefined}
        a11yFilter={a11yFilter}
        categoryFilter={categoryFilter}
        setA11yFilter={setA11yFilter}
        setCategoryFilter={setCategoryFilter}
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
