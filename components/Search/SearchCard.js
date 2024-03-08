import { SearchBox, SearchHeader, SearchBar } from "./Search.styled";
import BackButton from "../BackButton/BackButton";
export default function SearchCard({ handleSubmit }) {
  return (
    <SearchBox>
      <BackButton />
      <SearchHeader>Wonach suchst Du?</SearchHeader>
      <form onSubmit={(event) => handleSubmit(event)}>
        <SearchBar type="search" name="searchTerm" placeholder="Suche" />
      </form>
    </SearchBox>
  );
}
