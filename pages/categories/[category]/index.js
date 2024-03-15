import BackButton from "@/components/BackButton/BackButton";
import CategoryHeader from "@/components/CategoryHeader/CategoryHeader";
import EventList from "@/components/EventList/EventList";

import MessageCard from "@/components/MessageCard/MessageCard";
import { useRouter } from "next/router";
import { Data } from "@/lib/DataContext";

export default function CategoryPage() {
  const { events, categories } = Data();
  const router = useRouter();
  const { category: categorySlug } = router.query;
  const [selectedCategory] = categories.filter(
    (cat) => cat.slug === categorySlug
  );

  if (!selectedCategory) {
    return;
  }

  const filteredEvents = events.filter(
    (ev) => ev.category === selectedCategory.title
  );

  if (!filteredEvents) {
    return;
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
