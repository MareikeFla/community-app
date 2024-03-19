import { createContext, useContext, useCallback } from "react";
import useSWR from "swr";
import { user } from "./user";

const DataContext = createContext();
const fetcher = (...args) => fetch(...args).then((res) => res.json());
export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  // Fetch categories
  const {
    data: categories,
    isLoading: isLoadingCategories,
    error: errorCategories,
  } = useSWR("/api/categories", fetcher);

  const sortedCategories =
    categories && !isLoadingCategories && !errorCategories
      ? [...categories].sort((a, b) => a.title.localeCompare(b.title))
      : [];

  const fetchedCategories = {
    categories: sortedCategories,
    isLoadingCategories,
    errorCategories,
  };

  // Fetch Events refreshing every two Minutes
  const {
    data: events,
    isLoading: isLoadingEvents,
    error: errorEvents,
    mutate: mutateEvents,
  } = useSWR("/api/events", fetcher, { refreshInterval: 2 * 60 * 1000 });

  const fetchedEvents = {
    events,
    isLoadingEvents,
    errorEvents,
  };

  // Function to filter events by categories id

  const filterEventsByCategoryID = useCallback(
    (categoryID) => {
      if (isLoadingEvents) {
        return;
      }
      return events.filter((ev) => ev.category._id === categoryID);
    },
    [events]
  );

  // Function to fetch event by id including comments

  function getEventByID(eventID) {
    const {
      data: event,
      isLoading: isLoadingEvent,
      error: errorEvent,
      mutate: mutateEvent,
    } = useSWR(`/api/events/${eventID}`);

    return { event, isLoadingEvent, errorEvent, mutateEvent };
  }

  // Function creating a new event an mutating events

  async function createEvent(eventData) {
    const response = await fetch("/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    });

    if (response.ok) {
      mutateEvents();
      const newEvent = await response.json();
      return newEvent.id;
    } else if (!response.ok) {
      return false;
    }
  }

  // Function updating an event and mutating events

  async function updateEvent(eventData, id) {
    const response = await fetch(`/api/events/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    });

    if (response.ok) {
      mutateEvents();
      return true;
    } else if (!response.ok) {
      return false;
    }
  }

  // Function delete event and mutate events

  async function deleteEvent(id) {
    const response = await fetch(`/api/events/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      mutateEvents();
      return true;
    } else if (!response.ok) {
      return false;
    }
  }

  // Function adding a comment to an event and mutate event

  async function addComment(id, comment, mutateEvent) {
    const response = await fetch(`/api/events/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...user,
        creationDate: new Date(),
        text: comment,
      }),
    });

    if (response.ok) {
      mutateEvent();
      return true;
    } else if (!response.ok) {
      return false;
    }
  }

  // Function update a comment and mutate event

  async function updateComment(_id, isLiked, mutate) {
    const response = await fetch(`/api/comments/${_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id,
        isLiked: !isLiked,
      }),
    });

    if (response.ok) {
      mutate();
    }
  }

  return (
    <DataContext.Provider
      value={{
        fetchedCategories,
        fetchedEvents,
        filterEventsByCategoryID,
        getEventByID,
        createEvent,
        updateEvent,
        deleteEvent,
        addComment,
        updateComment,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
