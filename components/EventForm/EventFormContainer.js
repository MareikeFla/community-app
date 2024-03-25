import {
  EventFormContainerStyled,
  EventFormTitle,
} from "./EventFormContainer.styled";
import EventForm from "./EventForm";
export default function EventFormContainer({ title, updateDatabase, event }) {
  return (
    <EventFormContainerStyled>
      <EventFormTitle>{title}</EventFormTitle>
      <EventForm updateDatabase={updateDatabase} event={event} />
    </EventFormContainerStyled>
  );
}
