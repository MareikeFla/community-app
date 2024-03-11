import Image from "next/image";
import { ButtonWrapper, IconWrapper } from "./ArrowButton.styled";

export default function ArrowButton({ href, children }) {
  return (
    <ButtonWrapper href={href}>
      {children}
      <IconWrapper>
        <Image
          src="/assets/icons/icon_arrow-right.svg"
          alt="Arrow to right"
          width={9}
          height={14}
        />
      </IconWrapper>
    </ButtonWrapper>
  );
}
