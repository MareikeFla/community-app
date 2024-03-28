import { useRef, useState } from "react";
import { useRouter } from "next/router";
import { getFormattedTodaysDate } from "./dateHelpers";
import { useSession } from "next-auth/react";
import { useModal } from "./useModal";
import { isFreeOfChargeText } from "./enrichEventObject";

export function useEventForm(editEvent) {
  const { showModal } = useModal();
  const { data: session } = useSession();
  const userID = session?.user.id;
  const router = useRouter();
  const MAX_CHAR_COUNT = 120;

  // State management start

  const initialStates = {
    isEditingEvent: editEvent ? true : false,
    isFreeOfCharge: editEvent ? editEvent?.costs === isFreeOfChargeText : true,
    costs: editEvent ? editEvent.costs : isFreeOfChargeText,
    startDate: editEvent?.start?.date || getFormattedTodaysDate(),
    endDate: editEvent?.end?.date || getFormattedTodaysDate(),
    startTime: editEvent?.start?.time || "08:00",
    endTime: editEvent?.end?.time || "09:00",
    charactersLeft: editEvent
      ? MAX_CHAR_COUNT - editEvent?.shortDescription?.length
      : MAX_CHAR_COUNT,
    isLinkRequired: editEvent?.links
      ? editEvent.links[0]?.linkDescription
      : false,
    isStreetRequired: editEvent ? editEvent?.location?.houseNumber : false,
  };

  const initialErrors = {
    endDate: null,
    endTime: null,
  };

  const [eventFormStates, setEventFormStates] = useState(initialStates);
  const [eventFormErrors, setEventFormErrors] = useState(initialErrors);
  let invalidInput = null;

  const formFieldRefs = {
    endDate: useRef(),
    endTime: useRef(),
  };

  // "reducer" function - gets an action object and returning one or many new state values
  // depending on the action.type key

  function handleEventFormStates(action) {
    const {
      isFreeOfCharge,
      isEditingEvent,
      startDate,
      endDate,
      startTime,
      endTime,
    } = eventFormStates;

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

      case "changeStartTime":
        const newStartTime = action.value;
        timeChecker(newStartTime, endTime);
        return { startTime: newStartTime };

      case "changeEndTime":
        const newEndTime = action.value;
        timeChecker(startTime, newEndTime);
        return { endTime: newEndTime };

      case "recalculateCharactersLeft":
        const charactersWritten = action.value;
        return { charactersLeft: MAX_CHAR_COUNT - charactersWritten };

      case "setCorrespondingFieldRequired":
        const isInputFilled = action.value !== "";
        const correspondingField = action.correspondingField;
        if (correspondingField === "street") {
          return { isStreetRequired: isInputFilled };
        } else if (correspondingField === "link") {
          return { isLinkRequired: isInputFilled };
        } else {
          console.error("Unknown corresponding field: " + correspondingField);
        }
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
    const errorField = findFirstNonNullKey(eventFormErrors);

    if (errorField) {
      formFieldRefs[errorField]?.current?.focus();
      return;
    } else if (!errorField) {
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

  function timeChecker(startTime, endTime) {
    if (startTime > endTime) {
      updateEventFormErrors({
        type: "addError",
        field: "endTime",
        text: "EndZeit kann nicht vor der StartZeit liegen",
      });
    }
    if (startTime < endTime && eventFormErrors.endTime !== null) {
      updateEventFormErrors({
        type: "removeError",
        field: "endTime",
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
      creationDate: editEvent.creationDate || getFormattedTodaysDate(),
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
    formFieldRefs,
    eventFormErrors,
    validateFormAndSubmit,
    handleCancel,
    MAX_CHAR_COUNT,
  };
}
