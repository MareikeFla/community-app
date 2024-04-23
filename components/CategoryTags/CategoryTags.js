import { CategoryTagList, CategoryTag } from "./CategoryTags.styled";
import { useData } from "@/lib/useData";

export default function CategoryTags({ category, subCategories }) {
  const { getSubCategoryTitleById } = useData();

  if (!category) {
    return null;
  }

  const renderCategoryTags = () => {
    if (subCategories && subCategories.length > 0) {
      return subCategories.map((subCatId, index) => {
        const subCatTitle = getSubCategoryTitleById(subCatId);
        return subCatTitle ? (
          <CategoryTag key={index} color={category.color}>
            {subCatTitle}
          </CategoryTag>
        ) : null;
      });
    } else {
      return <CategoryTag color={category.color}>{category.title}</CategoryTag>;
    }
  };

  return <CategoryTagList>{renderCategoryTags()}</CategoryTagList>;
}
