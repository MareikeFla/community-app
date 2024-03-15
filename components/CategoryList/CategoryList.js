import {
  CategoryListStyled,
  CategoryListContainer,
  CategoryLink,
} from "./CategoryList.styled";
import SectionTitle from "../SectionTitle/SectionTitle";
import CategoryCard from "../CategoryCard/CategoryCard";
import { Data } from "@/lib/Data/DataContext";
export default function CategoryList() {
  const { categories } = Data();

  return (
    <>
      <SectionTitle>Was interessiert dich?</SectionTitle>
      <CategoryListContainer>
        <CategoryListStyled>
          {categories.map((category) => (
            <CategoryLink
              key={category._id}
              href={`/categories/${category.slug}`}
            >
              <CategoryCard category={category} />
            </CategoryLink>
          ))}
        </CategoryListStyled>
      </CategoryListContainer>
    </>
  );
}
