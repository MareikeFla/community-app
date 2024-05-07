import WelcomeCard from "@/components/WelcomeCard/WelcomeCard";
import CategoryList from "@/components/CategoryList/CategoryList";
import EventList from "@/components/EventList/EventList";
import FetchingError from "@/components/FetchingError/FetchingError";
import Loading from "@/components/Loading/Loading";
import { useData } from "@/lib/useData";

export default function HomePage() {
  const { events, isLoadingEvents } = useData().fetchedEvents;

  if (isLoadingEvents) {
    return <Loading />;
  }

  return (
    <>
      <WelcomeCard />
      <CategoryList />
      <EventList events={events} isSorted={false} title={"Aktuelle Events"} />
    </>
  );
}
