import EventFormContainer from "@/components/EventForm/EventFormContainer";
import useSWR from "swr";
import { mutate } from "swr";
import { useRouter } from "next/router";
import Loading from "@/components/Loading/Loading";
import FetchingError from "@/components/FetchingError/FetchingError";

export default function EditEvent() {
  const router = useRouter();
  const { id } = router.query;
  const { data: event, isLoading, error } = useSWR(`/api/events/${id}`);

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
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
