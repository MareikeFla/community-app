import { SearchLinkStyled } from "./Search.styled";
import Image from "next/image";

export default function SearchLink() {
  return (
    <SearchLinkStyled href={"/search"}>
      <Image
        src="/assets/icons/icon_search.svg"
        alt="Suchlink"
        width={36}
        height={36}
      />
    </SearchLinkStyled>
  );
}
