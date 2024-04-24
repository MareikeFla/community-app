import { useScrollToTop } from "@/lib/useScrollToTop";
import { StyledBackToTopButton } from "./BackToTopButton.styled";
import { Arrow } from "../SvgIcons/SVGIcons";
import { useTheme } from "styled-components";
export default function BackToTopButton() {
  const { showButton, scrollToTop } = useScrollToTop();
  const { theme } = useTheme();
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
