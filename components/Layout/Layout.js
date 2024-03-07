import Navigation from "../Navigation/Navigation";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import BackToTopButton from "../BackToTopButton/BackToTopButton";
import { MainContent } from "./Layout.styled";

export default function Layout({ children }) {
  return (
    <>
      <Navigation />
      <Header />
      <MainContent>{children}</MainContent>
      <Footer />
      <BackToTopButton />
    </>
  );
}
