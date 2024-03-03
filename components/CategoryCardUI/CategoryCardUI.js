import {
  CategoryCardContainer,
  CategoryImage,
  CategoryInfo,
  CategoryInfoContainer,
  CategoryInfoHeading,
} from "./CategoryCardUI.styled";

export default function CategoryCardUI({ category, filteredEvents }) {
  const { imageSource, imageAlt, title } = category;
  return (
    <CategoryCardContainer>
      <CategoryImage
        src={imageSource}
        alt={imageAlt}
        height={126}
        width={183}
        priority
      />
      <CategoryInfoContainer>
        <CategoryInfoHeading>{title}</CategoryInfoHeading>
        <CategoryInfo>
          {filteredEvents.length}{" "}
          {filteredEvents.length === 1 ? "Event" : "Events"}
        </CategoryInfo>
      </CategoryInfoContainer>
    </CategoryCardContainer>
  );
}
