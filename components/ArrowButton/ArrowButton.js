import { ButtonWrapper, IconWrapper } from "./ArrowButton.styled";
import { Arrow } from "../SvgIcons/SVGIcons";
import { useColorTheme } from "@/lib/useColorTheme";

export default function ArrowButton({ onClick, children }) {
  const { theme } = useColorTheme();
  return (
    <ButtonWrapper onClick={onClick}>
      {children}
      <IconWrapper>
        <Arrow $direction="right" $theme={theme}></Arrow>
      </IconWrapper>
    </ButtonWrapper>
  );
}
