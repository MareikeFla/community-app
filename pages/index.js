import WelcomeCard from "@/components/WelcomeCard/WelcomeCard";
import CategoryList from "@/components/CategoryList/CategoryList";
import EventList from "@/components/EventList/EventList";
import FetchingError from "@/components/FetchingError/FetchingError";
import Loading from "@/components/Loading/Loading";
import useSWR from "swr";

export default function HomePage() {
  const { data: events, isLoading, error } = useSWR("/api/events");

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <FetchingError />;
  }

  return (
    <>
      <WelcomeCard />
      <CategoryList />
      <EventList events={events} isSorted={false} />
    </>
  );
}
