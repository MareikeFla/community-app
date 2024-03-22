import EventFormContainer from "@/components/EventForm/EventFormContainer";
import { useRouter } from "next/router";
import Loading from "@/components/Loading/Loading";
import FetchingError from "@/components/FetchingError/FetchingError";
import { useData } from "@/lib/useData";
import { useSession } from "next-auth/react";
import MessageCard from "@/components/MessageCard/MessageCard";
import ArrowLink from "@/components/ArrowButton/ArrowLink";
import ArrowButton from "@/components/ArrowButton/ArrowButton";

export default function EditEvent() {
  const router = useRouter();
  const { id } = router.query;
  const { getEventByID, updateEvent } = useData();
  const { event, isLoadingEvent, errorEvent } = getEventByID(id);
  const { data: session } = useSession();
  const userId = session?.user.id;

  if (isLoadingEvent) {
    return <Loading />;
  }
  if (errorEvent) {
    return <FetchingError />;
  }

  return (
    <>
      {userId === event.createdBy ? (
        <EventFormContainer
          title={"Event bearbeiten"}
          updateDatabase={(eventData) => updateEvent(eventData, id)}
          event={event}
        />
      ) : (
        <MessageCard>
          <p>Du bist nicht berechtigt, dieses Event zu bearbeiten</p>
          {session ? (
            <ArrowLink href="/events/new">Event Erstellen</ArrowLink>
          ) : (
            <ArrowButton onClick={() => signIn()}>Jetzt Anmelden</ArrowButton>
          )}
        </MessageCard>
      )}
    </>
  );
}
