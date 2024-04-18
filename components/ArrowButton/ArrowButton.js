import Image from "next/image";
import { ButtonWrapper, IconWrapper } from "./ArrowButton.styled";

export default function ArrowButton({ onClick, children }) {
  return (
    <ButtonWrapper onClick={onClick}>
      {children}
      <IconWrapper>
        <Image
          src="/assets/icons/icon_arrow-right.svg"
          alt="Pfeil nach rechts"
          width={9}
          height={14}
        />
      </IconWrapper>
    </ButtonWrapper>
  );
}
