import Link from "next/link";
import styled from "styled-components";

export const ButtonWrapper = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font: var(--font_button);
  color: var(--color_white);
  text-transform: uppercase;
  text-decoration: none;
  background-color: var(--color_orange);
  border-radius: var(--border-radius_button);
  padding: 0.25rem 0.25rem 0.25rem 0.75rem;
  transition: var(--transition_button);

  &:hover {
    background-color: var(--color_light-orange);
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 1.625rem;
  aspect-ratio: 1;
  background-color: var(--color_light-orange);
  border-radius: var(--border-radius_round-button);
`;
