import MessageCard from "@/components/MessageCard/MessageCard";
import ArrowButton from "@/components/ArrowButton/ArrowButton";
import Profile from "@/components/Profile/Profile";
import ProfileForm from "@/components/Profile/ProfileForm";
import { signIn, useSession } from "next-auth/react";
import Loading from "@/components/Loading/Loading";
import { useData } from "@/lib/useData";
import { useState } from "react";
import { formatedUserInfo } from "@/lib/profile/profileHelper";
import Accordion from "@/components/Accordion/Accordion";
import AccordionMenu from "@/components/Accordion/AccordionMenu";

export default function ProfilePage() {
  const { data: session, status, update: updateSession } = useSession();
  const { updateUser } = useData();
  const [editMode, setEditMode] = useState(false);
  const [firstStatus, setFirstStatus] = useState(false);
  const [secondStatus, setSecondStatus] = useState(false);
  const { events, isLoadingEvents, errorEvents } = useData().fetchedEvents;

  function toggleEditMode() {
    setEditMode(!editMode);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const wasSuccsessful = await updateUser(event, session.user);
    if (wasSuccsessful) {
      updateSession();
    }
    toggleEditMode();
    return wasSuccsessful;
  };

  if (
    status === "loading" ||
    (status === "authenticated" && !session) ||
    isLoadingEvents ||
    errorEvents
  ) {
    return <Loading />;
  }
  const userInfo = formatedUserInfo(session);

  const eventsCreatedByUser = events.filter(
    (event) => event.createdBy === session.user._id
  );

  const attendedEventsIds = new Set();
  let attendedEvents = [];

  session.user.attendedEvents.forEach((id) => attendedEventsIds.add(id));
  attendedEvents = events.filter((event) => attendedEventsIds.has(event._id));

  if (!session) {
    return (
      <MessageCard>
        <p>Du bist nicht berechtigt diese Seite zu besuchen.</p>
        <ArrowButton onClick={() => signIn()}>Jetzt Anmelden</ArrowButton>
      </MessageCard>
    );
  } else {
    return (
      <>
        {editMode ? (
          <ProfileForm
            toggleEditMode={toggleEditMode}
            userInfo={userInfo}
            handleSubmit={handleSubmit}
          ></ProfileForm>
        ) : (
          <Profile
            toggleEditMode={toggleEditMode}
            userInfo={userInfo}
          ></Profile>
        )}
        <AccordionMenu>
          <Accordion
            text={"Meine Events"}
            items={eventsCreatedByUser || []}
            status={firstStatus}
            setStatus={setFirstStatus}
          />
          <Accordion
            text={"Merkliste"}
            items={attendedEvents}
            status={secondStatus}
            setStatus={setSecondStatus}
          />
        </AccordionMenu>
      </>
    );
  }
}
