import { useState } from "react";
import { useRouter } from "next/router";
import { useRef } from "react";
import { getFormattedTodaysDate } from "./dateHelpers";
import { useSession } from "next-auth/react";
import { useModal } from "./useModal";

export function useEventForm(editEvent) {
  const { data: session } = useSession();
  const userID = session?.user.id;
  const router = useRouter();
  const { showModal } = useModal();
  const isFreeOfChargeText = "Kostenlos";

  // State management start

  const initialStates = {
    isEditingEvent: editEvent ? true : false,
    isFreeOfCharge: editEvent ? editEvent?.costs === isFreeOfChargeText : true,
    costs: editEvent ? editEvent.costs : isFreeOfChargeText,
    startDate: editEvent?.start?.date || getFormattedTodaysDate(),
    endDate: editEvent?.end?.date || getFormattedTodaysDate(),
  };

  const initialErrors = {
    endDate: null,
  };

  const [eventFormStates, setEventFormStates] = useState(initialStates);
  const [eventFormErrors, setEventFormErrors] = useState(initialErrors);
  let invalidInput = null;

  // "reducer" function - gets an action object and returning one or many new state values
  // depending on the action.type key

  function handleEventFormStates(action) {
    const { isFreeOfCharge, isEditingEvent, startDate, endDate } =
      eventFormStates;

    switch (action.type) {
      case "changeCosts":
        const costs = action.value;
        return { costs };

      case "handleFreeOfChargeAndCostsRelation":
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

      case "changeStartDate":
        const newStartDate = action.value;
        dateChecker(newStartDate, endDate);
        return { startDate: newStartDate };

      case "changeEndDate":
        const newEndDate = action.value;
        dateChecker(startDate, newEndDate);
        return { endDate: newEndDate };
    }

    console.error("Unknown action: " + action.type);
  }

  function handleEventFormErrors(error) {
    switch (error.type) {
      case "addError":
        return { [error.field]: error.text };
      case "removeError":
        return { [error.field]: null };
    }
    console.error("Unknown error type: " + error.type);
  }

  // "dispatcher" function - is called with an action object,
  // calling the reducer with this action. Spreading the old eventFormStates with the new values
  // setting the eventFormStates with the new values

  function updateEventFormStates(action) {
    const newStates = handleEventFormStates(action);
    const newStateObject = { ...eventFormStates, ...newStates };
    setEventFormStates(newStateObject);
  }

  function updateEventFormErrors(error) {
    const newErrors = handleEventFormErrors(error);
    const newErrorObject = { ...eventFormErrors, ...newErrors };
    setEventFormErrors(newErrorObject);
  }

  // State management start

  // FORM VALIDATION START

  function validateFormAndSubmit(formData, onSubmit) {
    let isValide = true;
    if (eventFormErrors.endDate !== null) {
      isValide = false;
    }

    if (!isValide) {
      const errorField = findFirstNonNullKey(eventFormErrors);
      invalidInput = document.querySelector(`#${errorField}`);
      console.log(invalidInput);

      invalidInput.focus();
      return;
    } else if (isValide) {
      showModal({
        message: "Event speichern?", // Default message
        textButtonCancel: "Abbrechen", // Default text for the cancel button
        textButtonConfirm: "Speichern", // Default text for the confirm button
        onConfirm: () => handleSubmit(formData, onSubmit),
      });
    }
  }

  function dateChecker(startDate, endDate) {
    if (startDate > endDate) {
      updateEventFormErrors({
        type: "addError",
        field: "endDate",
        text: "Enddatum kann nicht vor dem Startdatum liegen",
      });
    }
    if (startDate < endDate && eventFormErrors.endDate !== null) {
      updateEventFormErrors({
        type: "removeError",
        field: "endDate",
      });
    }
  }

  function findFirstNonNullKey(errors) {
    for (let key of Object.keys(errors)) {
      if (errors[key] !== null) {
        return key;
      }
    }
  }

  // FORM VALIDATION END

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

  const handleSubmit = async (formData, onSubmit) => {
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
    eventFormErrors,
    validateFormAndSubmit,
    count,
    recalculateCharacters,
    handleCancel,
    MAX_CHAR_COUNT,
    isStreetRequired,
    isLinkRequired,
    checkIfCorrespondingFieldIsRequired,
  };
}
