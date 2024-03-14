import {
  EventFormContainerStyled,
  EventFormTitle,
} from "./EventFormContainer.styled";
import EventForm from "./EventForm";
import BackButton from "../BackButton/BackButton";
export default function EventFormContainer({ title, updateDatabase, event }) {
  return (
    <EventFormContainerStyled>
      <BackButton />
      <EventFormTitle>{title}</EventFormTitle>
      <EventForm updateDatabase={updateDatabase} event={event} />
    </EventFormContainerStyled>
  );
}
