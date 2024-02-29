import EventPreview from "../EventPreview/EventPreview";
import { EventListWrapper } from "./EventList.styled";

export default function EventList({ events }) {
  return (
    <EventListWrapper>
      {events.map((event) => (
        <EventPreview key={event._id} event={event} />
      ))}
    </EventListWrapper>
  );
}
