import EventFormContainer from "@/components/EventForm/EventFormContainer";
import { mutate } from "swr";
import { useRouter } from "next/router";
import Loading from "@/components/Loading/Loading";
import FetchingError from "@/components/FetchingError/FetchingError";
import { useData } from "@/lib/useData";

export default function EditEvent() {
  const router = useRouter();
  const { id } = router.query;
  const { getEventByID } = useData();
  const { event, isLoadingEvent, errorEvent } = getEventByID(id);

  if (isLoadingEvent) {
    return <Loading />;
  }
  if (errorEvent) {
    return <FetchingError />;
  }
  async function handleEditEvent(eventData) {
    const response = await fetch(`/api/events/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    });

    if (response.ok) {
      mutate();
      return response;
    }
  }
  return (
    <EventFormContainer
      title={"Event bearbeiten"}
      updateDatabase={handleEditEvent}
      event={event}
    />
  );
}
