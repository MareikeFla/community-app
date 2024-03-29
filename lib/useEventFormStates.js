import { useRef, useState } from "react";
import { useRouter } from "next/router";
import { getFormattedTodaysDate } from "./dateHelpers";
import { useSession } from "next-auth/react";
import { useModal } from "./useModal";
import { isFreeOfChargeText } from "./enrichEventObject";
import { createEventObject } from "./EventForm/createEventObject";

export function useEventFormStates(editEvent) {
  const { showModal } = useModal();
  const { data: session } = useSession();
  const userID = session?.user?.id;
  const router = useRouter();
  const MAX_CHAR_COUNT = 120;

  const initialStates = {
    isEditingEvent: editEvent ? true : false,
    isFreeOfCharge: editEvent ? editEvent?.costs === isFreeOfChargeText : true,
    costs: editEvent ? editEvent.costs : isFreeOfChargeText,
    startDate: editEvent?.start?.date || getFormattedTodaysDate(),
    endDate: editEvent?.end?.date || getFormattedTodaysDate(),
    startTime: editEvent?.start?.time || "08:00",
    endTime: editEvent?.end?.time || "12:00",
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

  const invalidFormFieldRefs = {
    endDate: useRef(),
    endTime: useRef(),
  };

  const [eventFormStates, setEventFormStates] = useState(initialStates);
  const [eventFormErrors, setEventFormErrors] = useState(initialErrors);

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
        const newCosts = action.value;
        return { costs: newCosts };

      case "handleFreeOfChargeAndCostsRelation":
        const isEditingEventFreeOfCharge = editEvent?.isFreeOfCharge;
        const newIsFreeOfCharge = !isFreeOfCharge;
        let updatedCosts;

        if (newIsFreeOfCharge) {
          updatedCosts = isFreeOfChargeText;
        } else if (!isEditingEvent || isEditingEventFreeOfCharge) {
          updatedCosts = "";
        } else if (isEditingEvent && !isEditingEventFreeOfCharge) {
          updatedCosts = editEvent.costs;
        }
        return { isFreeOfCharge: newIsFreeOfCharge, costs: updatedCosts };

      case "changeStartDate":
        const newStartDate = action.value;
        validateOrderAndSetError(
          newStartDate,
          endDate,
          "endDate",
          "End Datum kann nicht vor dem Start liegen."
        );
        return { startDate: newStartDate };

      case "changeEndDate":
        const newEndDate = action.value;
        validateOrderAndSetError(
          startDate,
          newEndDate,
          "endDate",
          "End Datum kann nicht vor dem Start liegen."
        );
        return { endDate: newEndDate };

      case "changeStartTime":
        const newStartTime = action.value;
        validateOrderAndSetError(
          newStartTime,
          endTime,
          "endTime",
          "End Zeit kann nicht vor der Start Zeit liegen."
        );
        return { startTime: newStartTime };

      case "changeEndTime":
        const newEndTime = action.value;
        validateOrderAndSetError(
          startTime,
          newEndTime,
          "endTime",
          "End Zeit kann nicht vor der Start Zeit liegen."
        );
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

  function updateEventFormStates(action) {
    const newStates = handleEventFormStates(action);
    const newStateObject = { ...eventFormStates, ...newStates };
    setEventFormStates(newStateObject);
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

  function updateEventFormErrors(error) {
    const newErrors = handleEventFormErrors(error);
    const newErrorObject = { ...eventFormErrors, ...newErrors };
    setEventFormErrors(newErrorObject);
  }

  function validateOrderAndSetError(start, end, field, errorMessage) {
    if (start > end) {
      updateEventFormErrors({
        type: "addError",
        field,
        text: errorMessage,
      });
    }
    if (start < end && eventFormErrors[field] !== null) {
      updateEventFormErrors({
        type: "removeError",
        field,
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

  // Submitting the form

  function validateFormAndSubmit(formData, onSubmit) {
    const errorField = findFirstNonNullKey(eventFormErrors);

    if (errorField) {
      invalidFormFieldRefs[errorField]?.current?.focus();
      return;
    } else {
      showModal({
        message: "Event speichern?",
        textButtonCancel: "Abbrechen",
        textButtonConfirm: "Speichern",
        onConfirm: () => handleSubmit(formData, onSubmit),
      });
    }
  }

  const handleSubmit = async (formData, onSubmit) => {
    const eventObject = createEventObject(formData, userID);
    const newEventID = await onSubmit(eventObject);
    router.push(
      editEvent ? `/events/${editEvent._id}` : `/events/${newEventID}`
    );
  };

  const handleCancel = () => {
    router.push("/");
  };

  return {
    eventFormStates,
    updateEventFormStates,
    invalidFormFieldRefs,
    eventFormErrors,
    validateFormAndSubmit,
    handleCancel,
    MAX_CHAR_COUNT,
  };
}
