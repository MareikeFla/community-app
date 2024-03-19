import EventFormContainer from "@/components/EventForm/EventFormContainer";
import { useRouter } from "next/router";
import Loading from "@/components/Loading/Loading";
import FetchingError from "@/components/FetchingError/FetchingError";
import { useData } from "@/lib/useData";

export default function EditEvent() {
  const router = useRouter();
  const { id } = router.query;
  const { getEventByID, updateEvent } = useData();
  const { event, isLoadingEvent, errorEvent } = getEventByID(id);

  if (isLoadingEvent) {
    return <Loading />;
  }
  if (errorEvent) {
    return <FetchingError />;
  }

  return (
    <EventFormContainer
      title={"Event bearbeiten"}
      updateDatabase={(eventData) => updateEvent(eventData, id)}
      event={event}
    />
  );
}
