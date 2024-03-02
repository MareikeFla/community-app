import {
  CategoryCardContainer,
  CategoryImage,
  CategoryInfo,
  CategoryInfoContainer,
  CategoryInfoHeading,
} from "./CategoryCard.styled";

export default function CategoryCard({ category }) {
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
        <CategoryInfo>xy Events</CategoryInfo>
      </CategoryInfoContainer>
    </CategoryCardContainer>
  );
}
