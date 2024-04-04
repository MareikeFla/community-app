import { useRouter } from "next/router";
import EventDetail from "@/components/EventDetail/EventDetail";
import Loading from "@/components/Loading/Loading";
import FetchingError from "@/components/FetchingError/FetchingError";
import { useData } from "@/lib/useData";

export default function EventDetailPage() {
  const router = useRouter();
  const { getEventByID } = useData();
  const { event, isLoadingEvent, errorEvent, mutateEvent } = getEventByID(
    router.query.id
  );

  if (isLoadingEvent) {
    return <Loading />;
  }
  if (errorEvent) {
    return <FetchingError />;
  }

  event.mutate = mutateEvent;

  return (
    <>
      <EventDetail event={event} mutateEvent={mutateEvent} />
    </>
  );
}
