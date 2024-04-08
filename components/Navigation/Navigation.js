import { useState } from "react";
import {
  NavigationContainer,
  NavIcon,
  NavMenu,
  NavLink,
  NavButton,
} from "./Navigation.styled";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

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
          {session ? (
            <>
              <li>
                <NavLink href="/events/new" onClick={toggleMenu}>
                  Event erstellen
                </NavLink>
              </li>
              <li>
                <NavLink href="/user/id" onClick={toggleMenu}>
                  Mein Profil
                </NavLink>
              </li>
            </>
          ) : null}
          {session ? (
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
          ) : (
            <li>
              <NavButton
                onClick={() => {
                  signIn();
                  toggleMenu();
                }}
              >
                Anmelden
              </NavButton>
            </li>
          )}
        </ul>
      </NavMenu>
    </NavigationContainer>
  );
}
