import { useScrollToTop } from "@/lib/useScrollToTop";
import { StyledBackToTopButton } from "./BackToTopButton.styled";
import { Arrow } from "../SvgIcons/SVGIcons";
import { useColorTheme } from "@/lib/useColorTheme";
export default function BackToTopButton() {
  const { showButton, scrollToTop } = useScrollToTop();
  const { theme } = useColorTheme();
  return (
    <StyledBackToTopButton
      title="Zurück nach oben"
      $showButton={showButton}
      onClick={scrollToTop}
    >
      <Arrow $direction={"up"} $theme={theme} />{" "}
    </StyledBackToTopButton>
  );
}
