import {
  EventFormContainerStyled,
  EventFormTitle,
} from "./EventFormContainer.styled";
import EventForm from "./EventForm";
export default function EventFormContainer({ title, onSubmit, event }) {
  return (
    <EventFormContainerStyled>
      <EventFormTitle>{title}</EventFormTitle>
      <EventForm onSubmit={onSubmit} event={event} />
    </EventFormContainerStyled>
  );
}
