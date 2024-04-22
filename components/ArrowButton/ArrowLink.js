import Image from "next/image";
import { IconWrapper, LinkWrapper } from "./ArrowButton.styled";
import { Arrow } from "../SvgIcons/SVGIcons";
import { useColorTheme } from "@/lib/useColorTheme";

export default function ArrowLink({ href, children }) {
  const { theme } = useColorTheme();
  return (
    <LinkWrapper href={href}>
      {children}
      <IconWrapper>
        <Arrow $direction="right" $theme={theme}></Arrow>
      </IconWrapper>
    </LinkWrapper>
  );
}
