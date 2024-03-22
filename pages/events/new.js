import ArrowButton from "@/components/ArrowButton/ArrowButton";
import EventFormContainer from "@/components/EventForm/EventFormContainer";
import MessageCard from "@/components/MessageCard/MessageCard";
import { useData } from "@/lib/useData";
import { signIn, useSession } from "next-auth/react";

export default function NewEvent() {
  const { createEvent } = useData();
  const { data: session } = useSession();

  return (
    <>
      {!session ? (
        <MessageCard>
          <p>Bitte melde dich an, um Events zu erstellen:</p>
          <ArrowButton onClick={() => signIn()}>Jetzt Anmelden</ArrowButton>
        </MessageCard>
      ) : (
        <EventFormContainer
          title={"Erstelle ein neues Event"}
          updateDatabase={(eventData) => createEvent(eventData)}
        />
      )}
    </>
  );
}
