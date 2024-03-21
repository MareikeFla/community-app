import { SearchBox, SearchCardHeader, SearchBar } from "./Search.styled";
export default function SearchCard({
  handleSubmit,
  debouncedInputChange,
  suggestions,
}) {
  return (
    <SearchBox>
      <SearchCardHeader>Wonach suchst Du?</SearchCardHeader>
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
