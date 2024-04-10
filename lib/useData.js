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

  const filterEventsByCategoryID = useCallback(
    (categoryID) => {
      if (isLoadingEvents) {
        return;
      }
      return events.filter((ev) => ev.category._id === categoryID);
    },
    [events]
  );

  function getEventByID(eventID) {
    const {
      data: event,
      isLoading: isLoadingEvent,
      error: errorEvent,
      mutate: mutateEvent,
    } = useSWR(`/api/events/${eventID}`);

    return { event, isLoadingEvent, errorEvent, mutateEvent };
  }

  const {
    data: comments,
    isLoading: isLoadingComments,
    error: errorComments,
    mutate: mutateComments,
  } = useSWR("/api/comments/", fetcher);
  const fetchedComments = {
    comments,
    isLoadingComments,
    errorComments,
    mutateComments,
  };

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

  async function joinEvent(userId, _id, mutateEvent) {
    const response = await fetch(`/api/user/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: userId,
        eventId: _id,
      }),
    });
    if (response.ok) mutateEvent();
  }

  async function updateUser(event, user) {
    const data = new FormData(event.target);
    const formData = Object.fromEntries(data);
    const userData = { ...user, ...formData };
    const response = await fetch(`/api/user/${userData.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (response.ok) {
      return userData;
    } else if (!response.ok) {
      return false;
    }
  }

  async function addComment(id, comment) {
    const response = await fetch(`/api/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...user,
        parentEventId: id,
        creationDate: new Date(),
        text: comment,
      }),
    });

    if (response.ok) {
      mutateComments();
      return true;
    } else if (!response.ok) {
      return false;
    }
  }

  async function updateComment(_id, isLiked) {
    const response = await fetch(`/api/comments/${_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id,
        isLiked: !isLiked,
      }),
    });

    if (response.ok) {
      mutateComments();
    }
  }

  async function addReply(id, comment) {
    const response = await fetch(`/api/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...user,
        parentCommentId: id,
        creationDate: new Date(),
        text: comment,
      }),
    });

    if (response.ok) {
      mutateComments();
      return true;
    } else if (!response.ok) {
      return false;
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
        fetchedComments,
        addReply,
        joinEvent,
        updateUser,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
