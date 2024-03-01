import EventPreview from "../EventPreview/EventPreview";
import { EventListWrapper, EventDetailsLink } from "./EventList.styled";

export default function EventList({ events }) {
  return (
    <EventListWrapper>
      {events.map((event) => (
        <EventDetailsLink key={event.id} href={`/events/${event.id}`}>
          <EventPreview event={event} />
        </EventDetailsLink>
      ))}
    </EventListWrapper>
  );
}
