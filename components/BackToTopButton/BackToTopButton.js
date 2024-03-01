import { useScrollToTop } from "@/lib/useScrollToTop";
import { StyledBackToTopButton, Icon } from "./BackToTopButton.styled";

export default function BackToTopButton() {
  const { showButton, scrollToTop } = useScrollToTop();

  return (
    <StyledBackToTopButton $showButton={showButton} onClick={scrollToTop}>
      <Icon src="assets/icons/icon_arrow-up.svg" alt="Back To Top" />
    </StyledBackToTopButton>
  );
}
