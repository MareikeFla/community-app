import { SearchBox, SearchHeader, SearchBar } from "./Search.styled";
import BackButton from "../BackButton/BackButton";
export default function SearchCard({
  handleSubmit,
  debouncedInputChange,
  suggestions,
}) {
  return (
    <SearchBox>
      <BackButton />
      <SearchHeader>Wonach suchst Du?</SearchHeader>
      <form onSubmit={(event) => handleSubmit(event)}>
        <SearchBar
          type="search"
          name="searchTerm"
          placeholder="Suche"
          list="suggestions"
          onInput={(event) => debouncedInputChange(event)}
        />
        <datalist id="suggestions">
          {suggestions.length > 0
            ? suggestions.map((suggestion) => (
                <option key={suggestion._id} value={suggestion.eventName} />
              ))
            : null}
        </datalist>
      </form>
    </SearchBox>
  );
}
