import WelcomeCard from "@/components/WelcomeCard/WelcomeCard";
import CategoryList from "@/components/CategoryList/CategoryList";
import EventList from "@/components/EventList/EventList";
import FetchingError from "@/components/FetchingError/FetchingError";
import Loading from "@/components/Loading/Loading";
import { useData } from "@/lib/useData";
import { useSession, signIn, signOut } from "next-auth/react";

export default function HomePage() {
  const { events, isLoadingEvents, errorEvents } = useData().fetchedEvents;

  if (isLoadingEvents) {
    return <Loading />;
  }
  if (errorEvents) {
    return <FetchingError />;
  }
  console.log(session);

  return (
    <>
      <WelcomeCard />
      <CategoryList />
      <EventList events={events} isSorted={false} title={"Aktuelle Events"} />
    </>
  );
}
