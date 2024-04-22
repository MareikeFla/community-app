import Image from "next/image";
import { IconWrapper, LinkWrapper } from "./ArrowButton.styled";

export default function ArrowLink({ href, children }) {
  return (
    <LinkWrapper href={href}>
      {children}
      <IconWrapper>
        <Image
          src="/assets/icons/icon_arrow-right.svg"
          alt="Pfeil nach rechts"
          width={9}
          height={14}
        />
      </IconWrapper>
    </LinkWrapper>
  );
}
