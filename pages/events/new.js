import EventFormCard from "@/components/EventForm/EventFormCard";
import { mutate } from "swr";

export default function NewEvent() {
  const handleNewEvent = async (data) => {
    const response = await fetch("/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      mutate();
    }
  };

  return (
    <EventFormCard
      title={"Erstelle ein neues Event"}
      updateDatabase={handleNewEvent}
    />
  );
}
