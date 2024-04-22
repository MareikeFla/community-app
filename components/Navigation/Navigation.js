import { useState } from "react";
import {
  NavigationContainer,
  NavIcon,
  NavMenu,
  NavLink,
  NavButton,
} from "./Navigation.styled";
import { signIn, signOut, useSession } from "next-auth/react";
import { navigationEntries } from "./navigationEntries";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
const navigationLinks = session 
    ? navigationEntries 
    : navigationEntries.filter(entry => !entry.requireSession);

  return (
    <NavigationContainer>
      <NavIcon onClick={toggleMenu} $isOpen={isOpen}>
        <span></span>
        <span></span>
        <span></span>
      </NavIcon>
      <NavMenu $isOpen={isOpen}>
        <ul>
          {navigationLinks.map((link) => {
            return (
              <li key={link.href}>
                <NavLink href={link.href} onClick={toggleMenu}>
                  {link.text}
                </NavLink>
              </li>
            );
          })}
          <li>
            <NavButton
              onClick={() => {
                {
                  session ? signOut() : signIn();
                }
                toggleMenu();
              }}
            >
              {session ? "Abmelden" : "Anmelden"}
            </NavButton>
          </li>
        </ul>
      </NavMenu>
    </NavigationContainer>
  );
}
