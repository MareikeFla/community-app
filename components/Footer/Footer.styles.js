import styled from "styled-components";
import Link from "next/link";

export const StyledFooter = styled.footer`
  background-color: var(--color_midnight);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.375rem 1rem;
  position: absolute;
  bottom: -10.75rem;
  width: 100%;
`;

export const FooterLinkContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const FooterLink = styled(Link)`
  color: var(--color_white);
  font: var(--font_footer);
  text-transform: uppercase;
  text-decoration: none;

  &:not(:last-child)::after {
    content: "Ι";
    font-weight: lighter;
    margin: 0 0.438rem;
  }
`;
