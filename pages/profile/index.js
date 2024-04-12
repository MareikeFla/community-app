import MessageCard from "@/components/MessageCard/MessageCard";
import ArrowButton from "@/components/ArrowButton/ArrowButton";
import Profile from "@/components/Profile/Profile";
import ProfileForm from "@/components/Profile/ProfileForm";
import { signIn, useSession } from "next-auth/react";
import Loading from "@/components/Loading/Loading";
import { useData } from "@/lib/useData";
import { useState } from "react";
import { formatedUserInfo } from "@/lib/profile/profileHelper";

export default function ProfilePage() {
  const { data: session, status, update: updateSession } = useSession();
  const { updateUser } = useData();
  const [editMode, setEditMode] = useState(false);

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

  if (status === "loading" || (status === "authenticated" && !session)) {
    return <Loading />;
  }
  const userInfo = formatedUserInfo(session);

  if (!session) {
    return (
      <MessageCard>
        <p>Du bist nicht berechtigt diese Seite zu besuchen.</p>
        <ArrowButton onClick={() => signIn()}>Jetzt Anmelden</ArrowButton>
      </MessageCard>
    );
  } else if (!editMode) {
    return (
      <Profile toggleEditMode={toggleEditMode} userInfo={userInfo}></Profile>
    );
  } else if (editMode) {
    return (
      <ProfileForm
        toggleEditMode={toggleEditMode}
        userInfo={userInfo}
        handleSubmit={handleSubmit}
      ></ProfileForm>
    );
  }
}
