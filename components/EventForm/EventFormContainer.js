import {
  EventFormContainerStyled,
  EventFormTitle,
} from "./EventFormContainer.styled";
import EventForm from "./EventForm";
import BackButton from "../BackButton/BackButton";
export default function EventFormContainer({ title, updateDatabase }) {
  return (
    <EventFormContainerStyled>
      <BackButton />
      <EventFormTitle>{title}</EventFormTitle>
      <EventForm updateDatabase={updateDatabase} />
    </EventFormContainerStyled>
  );
}
