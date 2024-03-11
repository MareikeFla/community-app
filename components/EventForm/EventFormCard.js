import {
  EventFormCardStyled,
  EventFormCardTitle,
} from "./EventFormCard.styled";
import EventForm from "./EventForm";
import BackButton from "../BackButton/BackButton";
export default function EventFormCard({ title, updateDatabase }) {
  return (
    <EventFormCardStyled>
      <BackButton />
      <EventFormCardTitle>{title}</EventFormCardTitle>
      <EventForm updateDatabase={updateDatabase} />
    </EventFormCardStyled>
  );
}
