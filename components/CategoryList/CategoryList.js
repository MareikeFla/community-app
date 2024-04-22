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
  const { categories, isLoadingCategories, errorCategories } =
    useData().fetchedCategories;

  if (isLoadingCategories) {
    return <Loading />;
  }
  if (errorCategories) {
    return <FetchingError />;
  }

  return (
    <>
      <SectionTitle>Was interessiert dich?</SectionTitle>
      <CategoryListContainer>
        <CategoryListStyled>
          {categories.map((category) => (
            <li key={category._id}>
              <CategoryLink href={`/categories/${category.slug}`}>
                <CategoryCard category={category} />
              </CategoryLink>
            </li>
          ))}
        </CategoryListStyled>
      </CategoryListContainer>
    </>
  );
}
