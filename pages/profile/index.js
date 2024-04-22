import MessageCard from "@/components/MessageCard/MessageCard";
import ArrowButton from "@/components/ArrowButton/ArrowButton";
import Profile from "@/components/Profile/Profile";
import ProfileForm from "@/components/Profile/ProfileForm";
import { signIn, useSession } from "next-auth/react";
import Loading from "@/components/Loading/Loading";
import { useData } from "@/lib/useData";
import { useState } from "react";
import { formatedUserInfo } from "@/lib/profile/profileHelper";
import AccordionMenu from "@/components/Accordion/AccordionMenu";
import EventList from "@/components/EventList/EventList";
import { useRouter } from "next/router";

export default function ProfilePage() {
  const { data: session, status, update: updateSession } = useSession();
  const { updateUser } = useData();
  const [editMode, setEditMode] = useState(false);
  const router = useRouter();
  const { openSection } = router.query;
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
  const accordionSections = [
    {
      id: 0,
      title: "Erstellte Events",
      component: EventList,
      componentsProps: { events: eventsCreatedByUser || [] },
      counter: eventsCreatedByUser.length,
      canOpen: eventsCreatedByUser.length !== 0,
      isHighlighted: eventsCreatedByUser.length !== 0,
      isOpen: false,
    },
    {
      id: 1,
      title: "Meine Merkliste",
      component: EventList,
      componentsProps: { events: attendedEvents || [] },
      counter: attendedEvents.length,
      canOpen: attendedEvents.length !== 0,
      isHighlighted: attendedEvents.length !== 0,
      isOpen: false,
    },
  ];
  if (openSection !== undefined && openSection < accordionSections.length) {
    accordionSections[openSection].isOpen = true;
  }

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
          />
        ) : (
          <Profile
            toggleEditMode={toggleEditMode}
            userInfo={userInfo}
          />
        )}
        <AccordionMenu sections={accordionSections}></AccordionMenu>
      </>
    );
  }
}
