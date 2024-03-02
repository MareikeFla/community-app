import useSWR from "swr";
import {
  CategoryCardContainer,
  CategoryImage,
  CategoryInfo,
  CategoryInfoContainer,
  CategoryInfoHeading,
} from "./CategoryCard.styled";
import Loading from "../Loading/Loading";
import FetchingError from "../FetchingError/FetchingError";

export default function CategoryCard({ category }) {
  const { data, isLoading, error } = useSWR(`api/${category.slug}`);

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <FetchingError />;
  }

  return (
    <CategoryCardContainer>
      <CategoryImage
        src={category.imageSource}
        alt={category.imageAlt}
        height={126}
        width={183}
      />
      <CategoryInfoContainer>
        <CategoryInfoHeading>{category.title}</CategoryInfoHeading>
        <CategoryInfo>
          {data.length} {data.length === 1 ? "Event" : "Events"}
        </CategoryInfo>
      </CategoryInfoContainer>
    </CategoryCardContainer>
  );
}
