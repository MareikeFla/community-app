import { ButtonWrapper, IconWrapper } from "./ArrowButton.styled";
import { Arrow } from "../SvgIcons/SVGIcons";
import { useTheme } from "styled-components";

export default function ArrowButton({ onClick, children }) {
  const { theme } = useTheme();

  return (
    <ButtonWrapper onClick={onClick}>
      {children}
      <IconWrapper>
        <Arrow $direction="right" $theme={theme}></Arrow>
      </IconWrapper>
    </ButtonWrapper>
  );
}
