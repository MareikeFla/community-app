import MessageCard from "@/components/MessageCard/MessageCard";
import ArrowButton from "@/components/ArrowButton/ArrowButton";
import Profile from "@/components/Profile/Profile";
import ProfileForm from "@/components/Profile/ProfileForm";
import { signIn, useSession, getSession } from "next-auth/react";
import Loading from "@/components/Loading/Loading";

import { useEffect, useState } from "react";

export default function profilePage() {
  let { data: session, status } = useSession();
  const [editMode, setEditMode] = useState(false);

  function toggleEditMode() {
    setEditMode(!editMode);
  }

  if (status === "loading") {
    return <Loading />;
  }
  if (!session) {
    return (
      <MessageCard>
        <p>Du bist nicht berechtigt diese Seite zu besuchen.</p>
        <ArrowButton onClick={() => signIn()}>Jetzt Anmelden</ArrowButton>
      </MessageCard>
    );
  } else if (!editMode) {
    return (
      <Profile toggleEditMode={toggleEditMode} session={session}></Profile>
    );
  } else if (editMode) {
    return (
      <ProfileForm
        toggleEditMode={toggleEditMode}
        session={session}
      ></ProfileForm>
    );
  }
}
