import { useState } from "react";
import { useRouter } from "next/router";
import { getFormattedTodaysDate } from "./dateHelpers";
import { useSession } from "next-auth/react";

export function useEventForm(editEvent) {
  const { data: session } = useSession();
  const userID = session?.user.id;
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
    isStreetRequired,
    isLinkRequired,
    checkIfCorrespondingFieldIsRequired,
  };
}
