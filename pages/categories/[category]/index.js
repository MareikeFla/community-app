import BackButton from "@/components/BackButton/BackButton";
import CategoryHeader from "@/components/CategoryHeader/CategoryHeader";
import EventList from "@/components/EventList/EventList";
import Loading from "@/components/Loading/Loading";
import MessageCard from "@/components/MessageCard/MessageCard";
import { useRouter } from "next/router";
import { Data } from "@/lib/Data/DataContext";

export default function CategoryPage() {
  const { events, categories, getCategoryBySlug } = Data();
  const router = useRouter();
  const { category: categorySlug } = router.query;
  const selectedCategory = getCategoryBySlug(categorySlug);

  if (!selectedCategory) {
    return <Loading />;
  }

  const filteredEvents = events.filter(
    (ev) => ev.category === selectedCategory.title
  );

  if (!filteredEvents) {
    return <Loading />;
  }

  return (
    <>
      <BackButton />
      {selectedCategory && <CategoryHeader category={selectedCategory} />}
      {filteredEvents.length === 0 ? (
        <MessageCard>Keine Events gefunden...</MessageCard>
      ) : (
        <EventList events={filteredEvents} isSorted={false} />
      )}
    </>
  );
}
