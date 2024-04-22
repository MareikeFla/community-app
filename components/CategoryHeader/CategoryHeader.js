import {
  CategoryHeaderContainer,
  CategoryTitle,
  CategoryImage,
} from "./CategoryHeader.styled";
import { useColorTheme } from "@/lib/useColorTheme";

export default function CategoryHeader({ category }) {
  const { imageSource, imageAlt, title } = category;
  const { theme } = useColorTheme();

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
