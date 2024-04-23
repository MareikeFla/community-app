import {
  CategoryHeaderContainer,
  CategoryTitle,
  CategoryImage,
} from "./CategoryHeader.styled";
import { useTheme } from "styled-components";

export default function CategoryHeader({ category }) {
  const { imageSource, imageAlt, title } = category;
  const { theme } = useTheme();

  return (
    <CategoryHeaderContainer>
      <CategoryTitle theme={theme}>{title}</CategoryTitle>
      <CategoryImage
        src={imageSource}
        alt={imageAlt}
        sizes="100vw 100vh"
        fill
        priority
      />
    </CategoryHeaderContainer>
  );
}
