import { useRouter } from "next/router";
import { BackButtonWrapper, BackIcon } from "./BackButton.styled";

export default function BackButton() {
  const router = useRouter();

  const handleClick = () => {
    router.back();
  };

  return (
    <BackButtonWrapper onClick={handleClick} aria-label="Back to home page">
      <BackIcon
        src="/assets/icons/icon_arrow-left.svg"
        alt="Arrow to left"
        width={10}
        height={14}
      />
    </BackButtonWrapper>
  );
}
