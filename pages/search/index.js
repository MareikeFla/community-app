import SearchCard from "@/components/Search/SearchCard";
import EventList from "@/components/EventList/EventList";
import { SearchMessage } from "@/components/Search/Search.styled";
import useSearch from "@/lib/useSearch";

export default function SearchPage() {
  const {
    searchTerm,
    filteredEvents,
    handleSubmit,
    suggestions,
    handleInputChange,
  } = useSearch();

  return (
    <>
      <SearchCard
        handleSubmit={handleSubmit}
        handleInputChange={handleInputChange}
        suggestions={suggestions}
      />
      {filteredEvents.hasResults ===
      undefined ? null : filteredEvents.hasResults ? (
        <SearchMessage>
          Deine Suchergebnisse für {`"${searchTerm}"`}
        </SearchMessage>
      ) : (
        <SearchMessage>Die Suche ergab leider kein Ergebnis.</SearchMessage>
      )}
      <EventList events={filteredEvents.events} isSorted />
    </>
  );
}
