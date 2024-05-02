import { SearchBox, SearchCardHeader, SearchBar } from "./Search.styled";
import { A11yIconList } from "../A11yIcons/A11yIcons.styled";
import { A11yIconListColumn, A11yIconListRow } from "./Search.styled";
import { FilterHeading } from "./Search.styled";
import { IconWrap } from "./Search.styled";
import { icons } from "../A11yIcons/A11yIcons";
import { useData } from "@/lib/useData";
export default function SearchCard({
  handleSubmit,
  debouncedInputChange,
  suggestions,
  hasResults,
  a11yFilter,
  setA11yFilter,
}) {
  const { a11yIcons, isLoadingA11yIcons, errorA11yIcons } =
    useData().fetchedA11yIcons;
  if (isLoadingA11yIcons || errorA11yIcons) {
    return;
  }
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
      {hasResults ? (
        <A11yIconListColumn>
          <FilterHeading>Ergebnis filtern</FilterHeading>
          <A11yIconListRow>
            {a11yIcons.map((icon, i) => {
              const A11yIcon = icons[icon.icon];
              const isSelected = a11yFilter[icon._id];
              return (
                <IconWrap
                  key={i}
                  onClick={() => {
                    const newState = { ...a11yFilter };
                    let newStatus = true;
                    if (newState[icon._id] === true) {
                      newStatus = false;
                    }
                    newState[icon._id] = newStatus;
                    setA11yFilter(newState);
                  }}
                  $isSelected={isSelected}
                >
                  <A11yIcon />
                </IconWrap>
              );
            })}
          </A11yIconListRow>
        </A11yIconListColumn>
      ) : null}
    </SearchBox>
  );
}
