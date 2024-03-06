import SearchCard from "@/components/Search/SearchCard";
import EventList from "@/components/EventList/EventList";
import { useState } from "react";
import useSWR from "swr";
import Loading from "@/components/Loading/Loading";
import { SearchMessage } from "@/components/Search/Search.styled";

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: filteredEvents, isLoading } = useSWR(
    searchTerm ? `/api/search/${searchTerm}` : null
  );
  const hasSearchResults = filteredEvents
    ? filteredEvents.length > 0
      ? true
      : false
    : undefined;

  if (isLoading) {
    return <Loading />;
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSearchTerm(event.target.searchTerm.value);
  }

  return (
    <>
      <SearchCard handleSubmit={handleSubmit} />
      {hasSearchResults === undefined ? null : hasSearchResults ? (
        <SearchMessage>
          Deine Suchergebnisse für {`"${searchTerm}"`}
        </SearchMessage>
      ) : (
        <SearchMessage>Die Suche ergab leider kein Ergebnis.</SearchMessage>
      )}
      <EventList events={filteredEvents} isSorted />
    </>
  );
}
