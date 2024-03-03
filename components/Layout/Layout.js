import BackToTopButton from "../BackToTopButton/BackToTopButton";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import { MainContent } from "./Layout.styled";

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <MainContent>{children}</MainContent>
      <Footer />
      <BackToTopButton />
    </>
  );
}
