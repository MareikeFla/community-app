import { useState } from "react";
import { useRouter } from "next/router";
import { getFormattedTodaysDate } from "./dateHelpers";
import { useSession } from "next-auth/react";

export function useEventForm(editEvent) {
  const { data: session } = useSession();
  const userID = session?.user.id;
  const router = useRouter();

  // MAREIKES REDUCER START

  const isFreeOfChargeText = "Kostenlos";

  // Initial state object and state

  const initialStates = {
    isEditingEvent: editEvent ? true : false,
    isFreeOfCharge: editEvent ? editEvent?.costs === isFreeOfChargeText : true,
    costs: editEvent ? editEvent.costs : isFreeOfChargeText,
  };

  const [eventFormStates, setEventFormStates] = useState(initialStates);

  // "reducer" function - gets an action object and returning one or many new state values
  // depending on the action.type key

  function handleEventFormStates(action) {
    switch (action.type) {
      case "changeCosts":
        const costs = action.value;
        return { costs };

      case "handleFreeOfChargeAndCostsRelation":
        const { isFreeOfCharge, isEditingEvent } = eventFormStates;
        const isEditingEventFreeOfCharge = editEvent?.isFreeOfCharge;
        const newIsFreeOfCharge = !isFreeOfCharge;
        let newCosts;

        if (newIsFreeOfCharge) {
          newCosts = isFreeOfChargeText;
        } else if (!isEditingEvent || isEditingEventFreeOfCharge) {
          newCosts = "";
        } else if (isEditingEvent && !isEditingEventFreeOfCharge) {
          newCosts = editEvent.costs;
        }
        return { isFreeOfCharge: newIsFreeOfCharge, costs: newCosts };
    }

    console.error("Unknown action: " + action.type);
  }

  // "dispatcher" function - is called with an action object,
  // calling the reducer with this action. Spreading the old eventFormStates with the new values
  // setting the eventFormStates with the new values

  function updateEventFormStates(action) {
    const newStates = handleEventFormStates(action);
    const newStateObject = { ...eventFormStates, ...newStates };
    setEventFormStates(newStateObject);
  }

  // MAREIKES REDUCER END

  // Handle costs switch relation with costs input field

  const [isFreeOfCharge, setIsFreeOfCharge] = useState(
    editEvent ? editEvent.costs === "Kostenlos" : true
  );

  // Handle start dates relation to end date and vice versa

  const [startDate, setStartDate] = useState(
    editEvent?.start?.date || getFormattedTodaysDate()
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
  const [count, setCount] = useState(
    editEvent
      ? MAX_CHAR_COUNT - editEvent.shortDescription.length
      : MAX_CHAR_COUNT
  );

  const recalculateCharacters = (event) => {
    const newCharacterCount = event.target.value.length;
    const newCount = MAX_CHAR_COUNT - newCharacterCount;
    if (newCount !== count) {
      setCount(newCount);
    }
  };

  // Handle linkURLs relation to linkDescription

  const [isLinkRequired, setIsLinkRequired] = useState(
    editEvent ? editEvent.links[0]?.linkDescription : false
  );
  const [isStreetRequired, setIsStreetRequired] = useState(
    editEvent ? editEvent.location?.houseNumber : false
  );

  function checkIfCorrespondingFieldIsRequired(event) {
    const { id, value } = event.target;
    const isInputFilled = value !== "";

    if (id === "linkDescription") {
      setIsLinkRequired(isInputFilled);
    } else if (id === "houseNumber") {
      setIsStreetRequired(isInputFilled);
    }
  }
  // Submitting the form

  const handleSubmit = async (event, onSubmit) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const formData = Object.fromEntries(data);
    const eventObject = createEventObject(formData);
    const newEventID = await onSubmit(eventObject);
    router.push(
      editEvent ? `/events/${editEvent._id}` : `/events/${newEventID}`
    );
  };

  function createEventObject(formData) {
    return {
      createdBy: userID,
      eventName: formData.eventName,
      start: {
        date: formData.startDate,
        time: formData.startTime,
      },
      end: {
        date: formData.endDate,
        time: formData.endTime,
      },
      location: {
        city: formData.city,
        zip: formData.zip,
        street: formData.street,
        houseNumber: formData.houseNumber,
      },
      category: formData.category,
      organization: {
        organizationName: formData.organization,
        organizationContact: formData.contact,
      },
      costs: formData.costs,
      shortDescription: formData.shortDescription,
      longDescription: formData.longDescription,
      links: [
        {
          url: formData.linkURL,
          linkDescription: formData.linkDescription,
        },
      ],
    };
  }

  const handleCancel = () => {
    router.push("/");
  };

  return {
    eventFormStates,
    updateEventFormStates,
    isFreeOfChargeText,
    isFreeOfCharge,
    setIsFreeOfCharge,
    count,
    recalculateCharacters,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    handleStartDateChange,
    handleEndDateChange,
    handleSubmit,
    handleCancel,
    MAX_CHAR_COUNT,
    isStreetRequired,
    isLinkRequired,
    checkIfCorrespondingFieldIsRequired,
  };
}
