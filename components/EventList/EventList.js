import EventPreview from "../EventPreview/EventPreview";
import { EventListWrapper, EventDetailsLink } from "./EventList.styled";
import SectionTitle from "../SectionTitle/SectionTitle";

export default function EventList({ events = [], isSorted, title }) {
  if (!isSorted) {
    events.sort((a, b) => new Date(a.start.date) - new Date(b.start.date));
  }

  return (
    <>
      {title ? <SectionTitle>{title}</SectionTitle> : null}
      <EventListWrapper>
        {events.map((event) => (
          <li>
            <EventDetailsLink key={event._id} href={`/events/${event._id}`}>
              <EventPreview event={event} />
            </EventDetailsLink>
          </li>
        ))}
      </EventListWrapper>
    </>
  );
}
