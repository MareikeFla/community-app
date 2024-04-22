import { SearchLinkStyled } from "./Search.styled";
import { SearchIcon } from "../SvgIcons/SVGIcons";
import { useColorTheme } from "@/lib/useColorTheme";

export default function SearchLink() {
  const { theme } = useColorTheme();
  return (
    <SearchLinkStyled href={"/search"}>
      <SearchIcon $theme={theme} />
    </SearchLinkStyled>
  );
}
