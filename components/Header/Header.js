import Logo from "public/logo.svg";
import { HeaderBackground, LogoHeader, HeaderCutout } from "./Header.styles";
import AddEventButton from "../AddEventButton/AddEventButton";

export default function Header() {
  function handleAddButtonClick() {
    console.log("Add button clicked");
  }
  return (
    <HeaderBackground>
      <AddEventButton onClick={handleAddButtonClick} />
      <LogoHeader>
        <Logo aria-label="Pin&Join Logo" />
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
