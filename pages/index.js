import EventList from "@/components/EventList/EventList";
import { events } from "@/lib/events";

export default function HomePage() {
  return (
    <>
      <EventList events={events} />
    </>
  );
}
