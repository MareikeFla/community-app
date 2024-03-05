import { SearchBox } from "./SearchCard.styled";
import BackButton from "../BackButton/BackButton";
import { SearchHeader } from "./SearchCard.styled";

export default function SearchCard({ onSubmit }) {
  return (
    <>
      <SearchBox>
        <BackButton></BackButton>
        <SearchHeader>Wonach suchst Du?</SearchHeader>
        <form onSubmit={(event) => onSubmit(event)}>
          <input type="search" name="searchTerm" />
        </form>
      </SearchBox>
    </>
  );
}
