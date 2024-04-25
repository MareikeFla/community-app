import CategoryHeader from "@/components/CategoryHeader/CategoryHeader";
import EventList from "@/components/EventList/EventList";
import FetchingError from "@/components/FetchingError/FetchingError";
import Loading from "@/components/Loading/Loading";
import MessageCard from "@/components/MessageCard/MessageCard";
import { useRouter } from "next/router";
import { useData } from "@/lib/useData";

export default function SubcategoryPage() {
  const router = useRouter();
  const { category, subcategory } = router.query;
  const {
    fetchedCategories,
    isLoadingCategories,
    errorCategories,
    filterEventsBySubCategoryID,
  } = useData();

  if (isLoadingCategories) {
    return <Loading />;
  }

  if (errorCategories) {
    return <FetchingError />;
  }

  const selectedCategory = fetchedCategories.categories.find(
    (cat) => cat.slug === category
  );

  if (!selectedCategory || !selectedCategory.subCategories) {
    return <FetchingError />;
  }

  const selectedSubcategory = selectedCategory.subCategories.find(
    (subcat) => subcat.slug === subcategory
  );

  if (!selectedSubcategory) {
    return <FetchingError />;
  }

  const filteredEvents = filterEventsBySubCategoryID(selectedSubcategory._id);

  return (
    <>
      <CategoryHeader category={selectedSubcategory} />
      {filteredEvents && filteredEvents.length === 0 ? (
        <MessageCard>Keine Events gefunden...</MessageCard>
      ) : (
        <EventList events={filteredEvents} isSorted={false} />
      )}
    </>
  );
}
