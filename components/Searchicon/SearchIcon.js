import { SearchLink } from "./SearchIcon.styled";
import Image from "next/image";

export default function SearchIcon() {
  return (
    <SearchLink href={"/search"}>
      <Image
        src="/assets/icons/icon_search.svg"
        alt="Search Button"
        width={36}
        height={36}
      />
    </SearchLink>
  );
}
