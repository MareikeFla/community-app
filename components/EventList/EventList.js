import EventPreview from "../EventPreview/EventPreview";
import { EventListWrapper } from "./EventList.styled";

export default function EventList({ events }) {
  return (
    <EventListWrapper>
      {events.map((event) => (
        <EventPreview key={event.id} event={event} />
      ))}
    </EventListWrapper>
  );
}
