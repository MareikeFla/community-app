import { SearchLinkStyled } from "./Search.styled";
import { SearchIcon } from "../SvgIcons/SVGIcons";
import { useTheme } from "styled-components";

export default function SearchLink() {
  const { theme } = useTheme();
  return (
    <SearchLinkStyled href={"/search"}>
      <SearchIcon $theme={theme} />
    </SearchLinkStyled>
  );
}
