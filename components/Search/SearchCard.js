import {
  SearchBox,
  SearchHeader,
  SearchBar,
  SearchForm,
  SearchMessage,
} from "./Search.styled";
import BackButton from "../BackButton/BackButton";
export default function SearchCard({ handleSubmit }) {
  return (
    <SearchBox>
      <BackButton />
      <SearchHeader>Wonach suchst Du?</SearchHeader>
      <SearchForm onSubmit={(event) => handleSubmit(event)}>
        <SearchBar type="search" name="searchTerm" placeholder="Suche" />
      </SearchForm>
    </SearchBox>
  );
}
