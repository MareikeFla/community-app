import SearchCard from "@/components/Search/SearchCard";
import EventList from "@/components/EventList/EventList";
import { useState } from "react";
import useSWR from "swr";
import Loading from "@/components/Loading/Loading";

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { data: filteredEvents, isLoading } = useSWR(
    `/api/search/${searchTerm}`
  );

  if (isLoading) {
    return <Loading />;
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSearchTerm(event.target.searchTerm.value);
  }

  return (
    <>
      <SearchCard onSubmit={handleSubmit} />
      {searchTerm ? `Suchergebnis für: ${searchTerm}` : ""}
      <EventList events={filteredEvents} />
    </>
  );
}
