import {
  CategoryListStyled,
  CategoryListContainer,
  CategoryLink,
} from "./CategoryList.styled";
import SectionTitle from "../SectionTitle/SectionTitle";
import CategoryCard from "../CategoryCard/CategoryCard";

export default function CategoryList({ categories }) {
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
