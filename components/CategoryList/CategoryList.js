import { mainCategories } from "@/lib/mainCategories";
import {
  CategoryListStyled,
  CategoryListHeader,
  CategoryListContainer,
} from "./CategoryList.styled";
import CategoryCard from "../CategoryCard/CategoryCard";

export default function CategoryList() {
  return (
    <CategoryListContainer>
      <CategoryListHeader>Was interessiert dich?</CategoryListHeader>
      <CategoryListStyled>
        {mainCategories.map((category) => (
          <CategoryCard key={category.slug} category={category} />
        ))}
      </CategoryListStyled>
    </CategoryListContainer>
  );
}
