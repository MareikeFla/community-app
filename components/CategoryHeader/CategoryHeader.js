import {
  CategoryHeaderContainer,
  CategoryTitle,
  CategoryImage,
} from "./CategoryHeader.styled";

export default function CategoryHeader({ category }) {
  const { imageSource, imageAlt, title } = category;

  return (
    <CategoryHeaderContainer>
      <CategoryTitle>{title}</CategoryTitle>
      <CategoryImage
        src={imageSource}
        alt={imageAlt}
        layout="fill"
        objectFit="cover"
      />
    </CategoryHeaderContainer>
  );
}
