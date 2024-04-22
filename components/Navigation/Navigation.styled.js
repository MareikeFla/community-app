import Link from "next/link";
import styled from "styled-components";

export const NavigationContainer = styled.nav`
  position: absolute;
  top: 0;
  left: 0;
`;

export const NavIcon = styled.div`
  position: absolute;
  top: 1.125rem;
  left: 1rem;
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 36px;
  aspect-ratio: 1;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: var(--border-radius_square-button);
  padding: 9px 7px;
  cursor: pointer;
  z-index: 3;

  span {
    height: 3px;
    background-color: var(--color_two);
    border-radius: 3px;
    transition: var(--transition_button);

    &:nth-child(1) {
      transform: ${({ $isOpen }) =>
        $isOpen ? "rotate(45deg) translate(5px, 5px)" : "rotate(0)"};
    }

    &:nth-child(2) {
      opacity: ${({ $isOpen }) => ($isOpen ? 0 : 1)};
    }

    &:nth-child(3) {
      transform: ${({ $isOpen }) =>
        $isOpen ? "rotate(-45deg) translate(5px, -5px)" : "rotate(0)"};
    }
  }
`;

export const NavMenu = styled.div`
  position: fixed;
  top: 0;
  left: ${({ $isOpen }) => ($isOpen ? "0" : "calc(-100% - 1rem)")};
  width: 100vw;
  height: 100vh;
  background-color: var(--color_six);
  display: flex;
  justify-content: center;
  align-items: center;
  transition: left 0.3s;
  z-index: 2;
  overflow: hidden;

  ul {
    list-style: none;
    width: 100%;
    overflow: hidden;
    position: relative;
    z-index: 2;
  }
`;

export const NavLink = styled(Link)`
  display: block;
  width: 100%;
  padding: 1rem;
  font: var(--font_heading-3);
  color: var(--color_base);
  text-decoration: none;
  text-transform: uppercase;
  text-align: center;

  &:hover {
    background-color: rgba(255, 255, 255, 0.04);
  }
`;
export const NavButton = styled.button`
  display: block;
  width: 100%;
  padding: 1rem;
  font: var(--font_heading-3);
  color: var(--color_base);
  background-color: var(--color_six);
  border: none;
  cursor: pointer;
  text-transform: uppercase;
  text-align: center;

  &:hover {
    background-color: rgba(255, 255, 255, 0.04);
  }
`;
