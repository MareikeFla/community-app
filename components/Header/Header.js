import Link from "next/link";
import Logo from "public/logo.svg";
import { HeaderBackground, LogoHeader, HeaderCutout } from "./Header.styles";
import SearchLink from "../Search/SearchLink";

export default function Header() {
  return (
    <HeaderBackground>
      <SearchLink />
      <LogoHeader>
        <Link href="/">
          <Logo aria-label="Pin&Join Logo" />
        </Link>
      </LogoHeader>
      <HeaderCutout
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <polygon fill="var(--color_body)" points="0,0 0,100 100,100" />
      </HeaderCutout>
    </HeaderBackground>
  );
}
