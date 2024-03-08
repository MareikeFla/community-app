import { NewEventCardStyled, NewEventCardTitle } from "./NewEventCard.styled";
import EventForm from "../EventForm/EventForm";
import BackButton from "../BackButton/BackButton";
import { mutate } from "swr";
export default function NewEventCard({}) {
  const createNewEvent = async (data) => {
    const response = await fetch("/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      mutate();
    }
  };
  return (
    <NewEventCardStyled>
      <BackButton />
      <NewEventCardTitle>Erstelle ein neues Event</NewEventCardTitle>
      <EventForm editFormData={createNewEvent} />
    </NewEventCardStyled>
  );
}
