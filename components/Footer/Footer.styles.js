import styled from "styled-components";

export const StyledFooter = styled.footer`
  background-color: var(--color_midnight);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.625rem 1rem;
  position: absolute;
  bottom: 0;
  width: 100vw;
`;

export const TextFooter = styled.p`
  color: var(--color_white);
  font: var(--font_footer);
  text-transform: uppercase;
`;
