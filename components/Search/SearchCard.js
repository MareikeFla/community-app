import { SearchBox, SearchCardHeader, SearchBar } from "./Search.styled";
import { ListColumn, ListRow } from "./Search.styled";
import { FilterHeading } from "./Search.styled";
import { IconWrap } from "./Search.styled";
import { icons } from "../A11yIcons/A11yIcons";
import { useData } from "@/lib/useData";
import { CategoryFilterTag } from "./Search.styled";
export default function SearchCard({
  handleSubmit,
  debouncedInputChange,
  suggestions,
  a11yFilter,
  setA11yFilter,
  categoryFilter,
  setCategoryFilter,
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
        <FilterHeading>Events filtern</FilterHeading>
        <ListRow>
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
        </ListRow>
      </ListColumn>
      <ListRow>
        {categories.map((category) => {
          const isSelected = categoryFilter[category._id];
          return (
            <CategoryFilterTag
              key={category._id}
              category={category}
              color={category.color}
              $isSelected={isSelected}
              onClick={() => {
                const newState = { ...categoryFilter };
                let newStatus = true;
                if (newState[category._id] === true) {
                  newStatus = false;
                }
                newState[category._id] = newStatus;
                setCategoryFilter(newState);
              }}
            >
              {category.title}
            </CategoryFilterTag>
          );
        })}
      </ListRow>
    </SearchBox>
  );
}
