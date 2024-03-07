import { NewEventCardStyled, NewEventCardTitle } from "./NewEventCard.styled";
import EventForm from "../EventForm/EventForm";
import BackButton from "../BackButton/BackButton";
export default function NewEventCard() {
  return (
    <NewEventCardStyled>
      <BackButton />
      <NewEventCardTitle>Erstelle ein neues Event</NewEventCardTitle>
      <EventForm />
    </NewEventCardStyled>
  );
}
