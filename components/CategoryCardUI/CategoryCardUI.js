import {
  CategoryCardContainer,
  ImageContainer,
  CategoryImage,
  CategoryInfo,
  CategoryInfoContainer,
  CategoryInfoHeading,
} from "./CategoryCardUI.styled";

export default function CategoryCardUI({ category, filteredEvents }) {
  const { imageSource, imageAlt, title } = category;
  return (
    <CategoryCardContainer>
      <ImageContainer>
        <CategoryImage
          src={imageSource}
          alt={imageAlt}
          layout="fill"
          objectFit="cover"
          priority
        />
      </ImageContainer>
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
