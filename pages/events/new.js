import EventFormContainer from "@/components/EventForm/EventFormContainer";
import { useData } from "@/lib/useData";

export default function NewEvent() {
  const { createEvent } = useData();

  return (
    <EventFormContainer
      title={"Erstelle ein neues Event"}
      updateDatabase={(eventData) => createEvent(eventData)}
    />
  );
}
