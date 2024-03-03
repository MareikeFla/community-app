import useSWR from "swr";
import Loading from "../Loading/Loading";
import FetchingError from "../FetchingError/FetchingError";
import CategoryCardUI from "../CategoryCardUI/CategoryCardUI";

export default function CategoryCard({ category }) {
  const { data, isLoading, error } = useSWR(`api/categories/${category.slug}`);

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <FetchingError />;
  }

  return <CategoryCardUI filteredEvents={data} category={category} />;
}
