import { useState } from "react";
import {
  NavigationContainer,
  NavIcon,
  NavMenu,
  NavLink,
  NavButton,
} from "./Navigation.styled";
import { signOut } from "next-auth/react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <NavigationContainer>
      <NavIcon onClick={toggleMenu} $isOpen={isOpen}>
        <span></span>
        <span></span>
        <span></span>
      </NavIcon>
      <NavMenu $isOpen={isOpen}>
        <ul>
          <li>
            <NavLink href="/" onClick={toggleMenu}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink href="/events/new" onClick={toggleMenu}>
              Event erstellen
            </NavLink>
          </li>
          <li>
            <NavButton
              onClick={() => {
                signOut();
                toggleMenu();
              }}
            >
              Abmelden
            </NavButton>
          </li>
        </ul>
      </NavMenu>
    </NavigationContainer>
  );
}
