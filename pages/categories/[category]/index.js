import BackButton from "@/components/BackButton/BackButton";
import CategoryHeader from "@/components/CategoryHeader/CategoryHeader";
import EventList from "@/components/EventList/EventList";
import FetchingError from "@/components/FetchingError/FetchingError";
import Loading from "@/components/Loading/Loading";
import MessageCard from "@/components/MessageCard/MessageCard";
import { useRouter } from "next/router";
import useSWR from "swr";
import { useData } from "@/lib/useData";

export default function CategoryPage() {
  const router = useRouter();
  const { category } = router.query;

  const { categories, isLoadingCategories, errorCategories } =
    useData().fetchedCategories;

  const {
    data: events,
    isLoading: eventLoading,
    error: eventError,
  } = useSWR(category ? `/api/categories/${category}` : null);

  if (isLoadingCategories || eventLoading) {
    return <Loading />;
  }
  if (errorCategories || eventError) {
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
