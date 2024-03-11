import EventPreview from "../EventPreview/EventPreview";
import { EventListWrapper, EventDetailsLink } from "./EventList.styled";

export default function EventList({ events = [], isSorted, heading }) {
  if (!isSorted) {
    events.sort((a, b) => new Date(a.start.date) - new Date(b.start.date));
  }

  return (
    <EventListWrapper>
      {heading ? <h2>{heading}</h2> : null}
      {events.map((event) => (
        <EventDetailsLink key={event._id} href={`/events/${event._id}`}>
          <EventPreview event={event} />
        </EventDetailsLink>
      ))}
    </EventListWrapper>
  );
}
