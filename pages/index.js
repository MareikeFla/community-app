import WelcomeCard from "@/components/WelcomeCard/WelcomeCard";
import CategoryList from "@/components/CategoryList/CategoryList";
import EventList from "@/components/EventList/EventList";
import FetchingError from "@/components/FetchingError/FetchingError";
import Loading from "@/components/Loading/Loading";
import useSWR from "swr";
import { useSession, signIn, signOut } from "next-auth/react";

export default function HomePage() {
  const { data: events, isLoading, error } = useSWR("/api/events");
  const { session } = useSession();

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
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
