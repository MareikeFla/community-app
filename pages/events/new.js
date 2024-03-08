import NewEventCard from "@/components/NewEventCard/NewEventCard";

export default function NewCard() {
  function handleNewEvent(eventName) {
    const newEventObject = {
      name: eventName,
    };
  }
  return (
    <>
      <NewEventCard onSubmit={handleNewEvent}></NewEventCard>
    </>
  );
}
