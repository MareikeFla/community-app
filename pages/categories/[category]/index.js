import BackButton from "@/components/BackButton/BackButton";
import CategoryHeader from "@/components/CategoryHeader/CategoryHeader";
import EventList from "@/components/EventList/EventList";
import FetchingError from "@/components/FetchingError/FetchingError";
import Loading from "@/components/Loading/Loading";
import MessageCard from "@/components/MessageCard/MessageCard";
import { useRouter } from "next/router";
import useSWR from "swr";

export default function CategoryPage() {
  const router = useRouter();
  const { category } = router.query;

  const {
    data: events,
    isLoading: eventLoading,
    error: eventError,
  } = useSWR(category ? `/api/categories/${category}` : null);

  const {
    data: categories,
    isLoading: categoryLoading,
    error: categoryError,
  } = useSWR("/api/categories");

  if (categoryLoading || eventLoading) {
    return <Loading />;
  }
  if (categoryError || eventError) {
    return <FetchingError />;
  }

  const selectedCategory = categories.find((cat) => cat.slug === category);

  return (
    <>
      <BackButton />
      {selectedCategory && <CategoryHeader category={selectedCategory} />}
      {events.length === 0 ? (
        <MessageCard>Keine Events gefunden...</MessageCard>
      ) : (
        <EventList events={events} isSorted={false} />
      )}
    </>
  );
}
