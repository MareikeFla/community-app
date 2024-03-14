import WelcomeCard from "@/components/WelcomeCard/WelcomeCard";
import CategoryList from "@/components/CategoryList/CategoryList";
import EventList from "@/components/EventList/EventList";
import FetchingError from "@/components/FetchingError/FetchingError";
import Loading from "@/components/Loading/Loading";
import useSWR from "swr";

export default function HomePage() {
  const {
    data: events,
    isLoading: isLoadingEvents,
    error: errorEvents,
  } = useSWR("/api/events");
  const {
    data: categories,
    isLoading: isLoadingCategories,
    error: errorCategories,
  } = useSWR("/api/categories");

  if (isLoadingEvents || isLoadingCategories) {
    return <Loading />;
  }
  if (errorEvents || errorCategories) {
    return <FetchingError />;
  }

  return (
    <>
      <WelcomeCard />
      <CategoryList categories={categories} />
      <EventList events={events} isSorted={false} title={"Aktuelle Events"} />
    </>
  );
}
