import CategoryCardUI from "../CategoryCardUI/CategoryCardUI";
import { useData } from "@/lib/useData";

export default function CategoryCard({ category }) {
  const { filterEventsByCategoryID } = useData();
  const categoryEventCount = filterEventsByCategoryID(category._id).length;

  return (
    <CategoryCardUI
      categoryEventCount={categoryEventCount}
      category={category}
    />
  );
}
