import { useRouter } from "next/router";
import { events } from "@/lib/events";
import EventDetail from "@/components/EventDetail/EventDetail";

export default function EventDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const event = events.find((event) => event.id === parseInt(id));

  return <EventDetail event={event} />;
}
