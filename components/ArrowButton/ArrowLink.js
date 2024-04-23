import Image from "next/image";
import { IconWrapper, LinkWrapper } from "./ArrowButton.styled";
import { Arrow } from "../SvgIcons/SVGIcons";
import { useTheme } from "styled-components";

export default function ArrowLink({ href, children }) {
  const { theme } = useTheme();
  return (
    <LinkWrapper href={href}>
      {children}
      <IconWrapper>
        <Arrow $direction="right" $theme={theme}></Arrow>
      </IconWrapper>
    </LinkWrapper>
  );
}
