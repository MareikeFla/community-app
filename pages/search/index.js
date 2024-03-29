import SearchCard from "@/components/Search/SearchCard";
import EventList from "@/components/EventList/EventList";
import useSearch from "@/lib/useSearch";

export default function SearchPage() {
  const {
    searchTerm,
    filteredEvents,
    handleSubmit,
    suggestions,
    debouncedInputChange,
  } = useSearch();

  return (
    <>
      <SearchCard
        handleSubmit={handleSubmit}
        debouncedInputChange={debouncedInputChange}
        suggestions={suggestions}
      />

      <EventList
        events={filteredEvents.events}
        isSorted
        title={
          filteredEvents.hasResults === undefined
            ? null
            : filteredEvents.hasResults
            ? `Deine Suchergebnisse für "${searchTerm}"`
            : `Deine Suche nach" "${searchTerm}" ergab leider kein Ergebnis.`
        }
      />
    </>
  );
}
