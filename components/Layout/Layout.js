import Navigation from "../Navigation/Navigation";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import BackToTopButton from "../BackToTopButton/BackToTopButton";
import { LogoHeader, MainContent, Wrapper } from "./Layout.styled";
import SearchLink from "../Search/SearchLink";
import Link from "next/link";
import { Logo } from "../SvgIcons/SVGIcons";
import { useColorTheme } from "@/lib/useColorTheme";

export default function Layout({ children }) {
  const { theme } = useColorTheme();
  return (
    <>
      <Header />
      <Wrapper>
        <Navigation />
        <LogoHeader>
          <Link href="/">
            <Logo aria-label="Pin&Join Logo" $theme={theme} />
          </Link>
        </LogoHeader>
        <SearchLink />
        <MainContent>{children}</MainContent>
      </Wrapper>
      <Footer />
      <BackToTopButton />
    </>
  );
}
