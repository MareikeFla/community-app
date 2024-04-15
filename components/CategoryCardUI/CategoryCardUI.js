import {
  CategoryCardContainer,
  ImageContainer,
  CategoryImage,
  CategoryInfo,
  CategoryInfoContainer,
  CategoryInfoHeading,
} from "./CategoryCardUI.styled";

export default function CategoryCardUI({ category, categoryEventCount }) {
  const { imageSource, imageAlt, title } = category;
  return (
    <CategoryCardContainer>
      <ImageContainer>
        <CategoryImage
          src={imageSource}
          alt={imageAlt}
          sizes="100vw 100vh"
          fill
          priority
        />
      </ImageContainer>
      <CategoryInfoContainer>
        <CategoryInfoHeading>{title}</CategoryInfoHeading>
        <CategoryInfo>
          {categoryEventCount} {categoryEventCount === 1 ? " Event" : " Events"}
        </CategoryInfo>
      </CategoryInfoContainer>
    </CategoryCardContainer>
  );
}
