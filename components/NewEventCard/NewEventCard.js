import { NewEventCardStyled, NewEventCardTitle } from "./NewEventCard.styled";
import EventForm from "../EventForm/EventForm";
export default function NewEventCard() {
  return (
    <NewEventCardStyled>
      <NewEventCardTitle>Erstelle ein neues Event</NewEventCardTitle>
      <EventForm />
    </NewEventCardStyled>
  );
}
