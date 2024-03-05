import styled from "styled-components";
import Link from "next/link";

export const SearchLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 1.2rem;
  right: 1rem;
  background-color: var(--color_white) 20%;
  border: none;
  border-radius: var(--border-radius_square-button);
  box-shadow: var(--shadow_button);
  transition: var(--transition_button);
  cursor: pointer;
`;
