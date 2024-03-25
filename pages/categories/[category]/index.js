import CategoryHeader from "@/components/CategoryHeader/CategoryHeader";
import EventList from "@/components/EventList/EventList";
import FetchingError from "@/components/FetchingError/FetchingError";
import Loading from "@/components/Loading/Loading";
import MessageCard from "@/components/MessageCard/MessageCard";
import { useRouter } from "next/router";
import { useData } from "@/lib/useData";

export default function CategoryPage() {
  const router = useRouter();
  const { category } = router.query;
  const { filterEventsByCategoryID } = useData();

  const { categories, isLoadingCategories, errorCategories } =
    useData().fetchedCategories;

  if (isLoadingCategories) {
    return <Loading />;
  }
  if (errorCategories) {
    return <FetchingError />;
  }

  const selectedCategory = categories.find((cat) => cat.slug === category);

  const filteredEvents = filterEventsByCategoryID(selectedCategory._id);

  if (filteredEvents === undefined) {
    return;
  }

  return (
    <>
      {selectedCategory && <CategoryHeader category={selectedCategory} />}
      {filteredEvents.length === 0 ? (
        <MessageCard>Keine Events gefunden...</MessageCard>
      ) : (
        <EventList events={filteredEvents} isSorted={false} />
      )}
    </>
  );
}
