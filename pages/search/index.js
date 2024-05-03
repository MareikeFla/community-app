import SearchCard from "@/components/Search/SearchCard";
import EventList from "@/components/EventList/EventList";
import useSearch from "@/lib/useSearch";
import { useEffect, useState } from "react";
import { useData } from "@/lib/useData";
import Loading from "@/components/Loading/Loading";
import Error from "next/error";

function isAnyValueTrue(objOne = {}, objTwo = {}) {
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
    const searchString = searchPerformed ? ` für "${searchTerm}"` : "";

    if (!searchPerformed && !isFiltered) {
      setTitle(null);
      return;
    }

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
    setIsFiltered(false);
  }, [searchTerm]);

  // Filter events based on filter selection

  useEffect(() => {
    const hasCategoryFilters = isAnyValueTrue(categoryFilter);
    const hasA11yFilters = isAnyValueTrue(a11yFilter);
    const hasFilters = hasCategoryFilters || hasA11yFilters;
    const searchPerformed = filteredEvents?.hasResults !== undefined;

    let newFilteredEvents = searchPerformed
      ? [...filteredEvents.events]
      : [...fetchedEvents];

    if (hasA11yFilters === true) {
      let filteredResult = newFilteredEvents.filter((event) => {
        let isIncluded = false;
        const a11yIcons = event.a11yIcons || [];
        a11yIcons.forEach((id) => {
          if (a11yFilter[id] === true) {
            isIncluded = true;
          }
        });
        return isIncluded;
      });
      newFilteredEvents = filteredResult;
    }

    if (hasCategoryFilters === true) {
      const result = newFilteredEvents.filter(
        (event) => categoryFilter[event.category._id] === true
      );
      newFilteredEvents = result;
    }
    // To prevent the title from appearing with delay
    if (!searchPerformed && hasFilters && newFilteredEvents.length > 0) {
      setTitle(`Deine Suchergebnisse (${newFilteredEvents.length})`);
    }

    setEvents(newFilteredEvents);
    setIsFiltered(isAnyValueTrue(a11yFilter, categoryFilter));
  }, [a11yFilter, categoryFilter]);

  if (isLoadingEvents) {
    return <Loading />;
  }
  if (errorEvents) {
    return <Error />;
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
