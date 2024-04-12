import { useRouter } from "next/router";
import EventDetail from "@/components/EventDetail/EventDetail";
import Loading from "@/components/Loading/Loading";
import FetchingError from "@/components/FetchingError/FetchingError";
import { useData } from "@/lib/useData";
import { restructureEvents } from "@/pages";

export default function EventDetailPage() {
  const { eventsBonn, isLoadingEventsBonn, errorEventsBonn } =
    useData().fetchedBonnEvents;
  const foooo = restructureEvents(eventsBonn);
  const router = useRouter();
  const id = router.query.id;
  const isBonn = router.query.bonn;
  console.log(isBonn);
  const { getEventByID } = useData();
  let bonnEvent = null;
  let dataBaseEvent = null;
  let loading = null;
  let error = null;
  let mutate = null;

  if (isBonn) {
    loading = isLoadingEventsBonn;
    error = errorEventsBonn;
  } else {
    const { event, isLoadingEvent, errorEvent, mutateEvent } = getEventByID(id);
    loading = isLoadingEvent;
    error = errorEvent;
    mutate = mutateEvent;
    dataBaseEvent = event;
  }

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <FetchingError />;
  }

  if (isBonn) {
    bonnEvent = foooo[id];
  }
  console.log(bonnEvent);
  return (
    <EventDetail event={bonnEvent || dataBaseEvent} mutateEvent={mutate} />
  );
}
