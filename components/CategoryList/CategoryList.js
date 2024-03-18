import {
  CategoryListStyled,
  CategoryListContainer,
  CategoryLink,
} from "./CategoryList.styled";
import SectionTitle from "../SectionTitle/SectionTitle";
import CategoryCard from "../CategoryCard/CategoryCard";
import { useData } from "@/lib/useData";
import Loading from "../Loading/Loading";
import FetchingError from "../FetchingError/FetchingError";

export default function CategoryList() {
  const { data: categories, isLoading, error } = useData().categories;

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <FetchingError />;
  }

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
