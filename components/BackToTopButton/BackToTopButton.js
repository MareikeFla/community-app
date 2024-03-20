import { useScrollToTop } from "@/lib/useScrollToTop";
import { StyledBackToTopButton } from "./BackToTopButton.styled";
import Image from "next/image";

export default function BackToTopButton() {
  const { showButton, scrollToTop } = useScrollToTop();

  return (
    <StyledBackToTopButton
      title="Zurück nach oben"
      $showButton={showButton}
      onClick={scrollToTop}
    >
      <Image
        src="assets/icons/icon_arrow-up.svg"
        alt="Back To Top"
        width={17}
        height={11}
      />
    </StyledBackToTopButton>
  );
}
