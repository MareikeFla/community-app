import SearchCard from "@/components/Search/SearchCard";
import EventList from "@/components/EventList/EventList";
import useSearch from "@/lib/useSearch";
import { A11yIconList } from "@/components/A11yIcons/A11yIcons.styled";
import IconWheelchair from "public/assets/icons/icon_wheelchair.svg";
import IconBlind from "public/assets/icons/icon_blind.svg";
import IconDeaf from "public/assets/icons/icon_deaf.svg";
import IconDog from "public/assets/icons/icon_dog.svg";
import IconLGBTQ from "public/assets/icons/icon_lgbtq.svg";
import IconFamily from "public/assets/icons/icon_family.svg";
import { useData } from "@/lib/useData";
import { useEffect, useState } from "react";
import { IconWrap } from "@/components/Search/Search.styled";

function isAnyValueTrue(obj) {
  for (const key in obj) {
    if (obj[key] === true) {
      return true;
    }
  }
  return false;
}

export default function SearchPage() {
  const {
    searchTerm,
    filteredEvents,
    handleSubmit,
    suggestions,
    debouncedInputChange,
  } = useSearch();

  const icons = {
    wheelchair: IconWheelchair,
    blind: IconBlind,
    deaf: IconDeaf,
    dog: IconDog,
    lgbtq: IconLGBTQ,
    family: IconFamily,
  };

  const [a11yFilter, setA11yFilter] = useState({});
  const [events, setEvents] = useState([]);
  const [isFiltered, setIsFiltered] = useState(isAnyValueTrue(a11yFilter));
  const [title, setTitle] = useState(null);

  // Set the event list title based on the search results
  useEffect(() => {
    const count = isFiltered ? events.length : filteredEvents.events.length;
    let newTitle = "";
    if (
      (filteredEvents.hasResults && isFiltered === false) ||
      (isFiltered === true && events.length > 0)
    ) {
      newTitle = `Deine Suchergebnisse für "${searchTerm}" (${count})`;
    } else {
      newTitle = `Deine Suche nach" "${searchTerm}" ergab leider kein Ergebnis.`;
    }
    if (filteredEvents.hasResults === undefined) {
      newTitle = null;
    }
    setTitle(newTitle);
  }, [filteredEvents.hasResults, events, isFiltered]);

  // Reset the filter when a new searchTerm is submitted
  useEffect(() => {
    setA11yFilter({});
  }, [searchTerm]);

  // Filter events based on a11yIcon selection
  useEffect(() => {
    const currentEvents = [...filteredEvents.events];
    const currentEventsFiltered = currentEvents.filter((event) => {
      let isIncluded = false;
      const a11yIcons = event.a11yIcons || [];
      a11yIcons.forEach((id) => {
        if (a11yFilter[id] === true) {
          isIncluded = true;
        }
      });
      return isIncluded;
    });
    setEvents(currentEventsFiltered);
    setIsFiltered(isAnyValueTrue(a11yFilter));
  }, [a11yFilter]);

  const { a11yIcons, isLoadingA11yIcons, errorA11yIcons } =
    useData().fetchedA11yIcons;
  if (isLoadingA11yIcons || errorA11yIcons) {
    return;
  }

  return (
    <>
      <SearchCard
        handleSubmit={handleSubmit}
        debouncedInputChange={debouncedInputChange}
        suggestions={suggestions}
      />
      {filteredEvents.hasResults ? (
        <A11yIconList>
          {a11yIcons.map((icon, i) => {
            const A11yIcon = icons[icon.icon];
            const isSelected = a11yFilter[icon._id];
            return (
              <IconWrap
                key={i}
                id={icon._id}
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
        </A11yIconList>
      ) : null}

      <EventList
        events={isFiltered ? events : filteredEvents.events}
        isSorted
        title={title}
      />
    </>
  );
}
