import { SearchBox, SearchCardHeader, SearchBar } from "./Search.styled";
import { ListColumn, ListRow } from "./Search.styled";
import { FilterHeading, FilterReset } from "./Search.styled";
import { IconWrap } from "./Search.styled";
import { icons } from "../A11yIcons/A11yIcons";
import { useData } from "@/lib/useData";
import { Tag } from "../EventForm/EventForm.styled";

export default function SearchCard({
  handleSubmit,
  debouncedInputChange,
  suggestions,
  a11yFilter,
  setA11yFilter,
  categoryFilter,
  setCategoryFilter,
  isFiltered,
}) {
  const { a11yIcons, isLoadingA11yIcons, errorA11yIcons } =
    useData().fetchedA11yIcons;
  const { categories, isLoadingCategories, errorCategories } =
    useData().fetchedCategories;

  if (
    isLoadingA11yIcons ||
    errorA11yIcons ||
    isLoadingCategories ||
    errorCategories
  ) {
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

      <ListColumn>
        <ListRow>
          <FilterHeading>Events filtern</FilterHeading>
          {isFiltered && (
            <FilterReset
              onClick={() => {
                setA11yFilter({});
                setCategoryFilter({});
              }}
            >
              (Filter zurücksetzen)
            </FilterReset>
          )}
        </ListRow>
        <ListRow>
          {a11yIcons.map((icon) => {
            const A11yIcon = icons[icon.icon];
            const isSelected = a11yFilter[icon._id];
            return (
              <IconWrap
                key={icon._id}
                title={icon.name}
                onClick={() => {
                  setA11yFilter((prevState) => ({
                    ...prevState,
                    [icon._id]: !prevState[icon._id],
                  }));
                }}
                $isSelected={isSelected}
              >
                <A11yIcon />
              </IconWrap>
            );
          })}
        </ListRow>
      </ListColumn>
      <ListRow>
        {categories.map((category) => {
          const isSelected = categoryFilter[category._id];
          return (
            <Tag
              key={category._id}
              category={category}
              color={category.color}
              selected={isSelected}
              title={category.title}
              onClick={() => {
                setCategoryFilter((prevState) => ({
                  ...prevState,
                  [category._id]: !prevState[category._id],
                }));
              }}
            >
              {category.title}
            </Tag>
          );
        })}
      </ListRow>
    </SearchBox>
  );
}
