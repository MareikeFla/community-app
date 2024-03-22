import { useState } from "react";
import { useRouter } from "next/router";

export function useEventForm(editEvent) {
  const router = useRouter();

  // Handle costs switch relation with costs input field

  const [isFreeOfCharge, setIsFreeOfCharge] = useState(
    editEvent ? editEvent.costs === "Kostenlos" : true
  );

  const initialCosts = editEvent ? editEvent.costs : "";
  const [costs, setCosts] = useState(initialCosts);

  function handleCostsChange(event) {
    setCosts(event.target.value);
  }

  // Handle start dates relation to end date and vice versa

  const [startDate, setStartDate] = useState(
    editEvent?.start?.date || getFormattedTodayDate()
  );
  const [endDate, setEndDate] = useState(editEvent?.end?.date || startDate);

  function handleStartDateChange(event) {
    const startDate = event.target.value;
    startDate > endDate && setEndDate(startDate);
    setStartDate(startDate);
  }

  function handleEndDateChange(event) {
    setEndDate(event.target.value);
  }

  // Handle counter for characters at short description

  const MAX_CHAR_COUNT = 120;
  const [count, setCount] = useState(MAX_CHAR_COUNT);

  const recalculateCharacters = (event) => {
    const newCharacterCount = event.target.value.length;
    const newCount = MAX_CHAR_COUNT - newCharacterCount;
    if (newCount !== count) {
      setCount(newCount);
    }
  };

  // Handle linkURLs relation to linkDescription

  const [linkURL, setLinkURL] = useState(editEvent?.links[0]?.url || "");
  const [linkDescription, setLinkDescription] = useState(
    editEvent?.links[0]?.linkDescription || ""
  );

  function handleLinkURLChange(event) {
    const newLinkURL = event.target.value;
    setLinkURL(newLinkURL);
    if (newLinkURL === "") {
      setLinkDescription("");
    }
  }

  function handleLinkDescriptionChange(event) {
    const newLinkDescription = event.target.value;
    setLinkDescription(newLinkDescription);
  }

  // Submitting the form

  const handleSubmit = async (event, updateDatabase) => {
    event.preventDefault();
    const eventObject = createEventObject(event);
    const newEventID = await updateDatabase(eventObject);
    router.push(
      editEvent ? `/events/${editEvent._id}` : `/events/${newEventID}`
    );
  };

  function createEventObject(event) {
    const eventTarget = event.target;
    return {
      eventName: eventTarget.eventName.value,
      start: {
        date: eventTarget.startDate.value,
        time: eventTarget.startTime.value,
      },
      end: {
        date: eventTarget.endDate.value,
        time: eventTarget.endTime.value,
      },
      location: {
        city: eventTarget.city.value,
        zip: eventTarget.zip.value,
        street: eventTarget.street.value,
        houseNumber: eventTarget.street.value
          ? eventTarget.houseNumber.value
          : "",
      },
      category: eventTarget.category.value,
      organization: {
        organizationName: eventTarget.organization.value,
        organizationContact: eventTarget.contact.value,
      },
      costs: eventTarget.costs.value,
      shortDescription: eventTarget.shortDescription.value,
      longDescription: eventTarget.longDescription.value,
      links: [
        {
          url: eventTarget.linkURL.value,
          linkDescription: eventTarget.linkDescription.value,
        },
      ],
    };
  }

  const handleCancel = () => {
    router.push("/");
  };

  return {
    isFreeOfCharge,
    setIsFreeOfCharge,
    costs,
    setCosts,
    count,
    recalculateCharacters,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    handleStartDateChange,
    handleEndDateChange,
    handleCostsChange,
    handleSubmit,
    handleCancel,
    MAX_CHAR_COUNT,
    linkURL,
    linkDescription,
    handleLinkURLChange,
    handleLinkDescriptionChange,
  };
}

export const autoGrow = (event) => {
  const textareaContainer = event.target;
  textareaContainer.style.height = "auto";
  textareaContainer.style.height = textareaContainer.scrollHeight + 1 + "px";
};

export const getFormattedTodayDate = () => {
  const today = new Date();
  const month = `0${today.getMonth() + 1}`.slice(-2);
  const day = `0${today.getDate()}`.slice(-2);
  return `${today.getFullYear()}-${month}-${day}`;
};
