import Link from "next/link";
import styled from "styled-components";
import css from "styled-jsx/css";

const wrapperStyles = css`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font: var(--font_button);
  color: var(--color_base);
  text-transform: uppercase;
  background-color: var(--color_eight);
  border-radius: var(--border-radius_button);
  padding: 0.25rem 0.25rem 0.25rem 0.75rem;
  transition: var(--transition_button);

  &:hover {
    background-color: var(--color_seven);
  }
`;

export const ButtonWrapper = styled.button`
  ${wrapperStyles}
  border: none;
  cursor: pointer;
`;
export const LinkWrapper = styled(Link)`
  ${wrapperStyles}
  text-decoration: none;
`;

export const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 1.625rem;
  aspect-ratio: 1;
  background-color: var(--color_seven);
  border-radius: var(--border-radius_round-button);
`;
