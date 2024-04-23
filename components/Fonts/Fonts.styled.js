import styled from "styled-components";

export const H1 = styled.h1`
  font: var(--font_heading-1);
  color: var(--color_five);
  margin: ${({ $margin }) => $margin};
  padding: ${({ $padding }) => $padding};
`;

export const H2 = styled.h2`
  font: var(--font_heading-2);
  color: var(--color_five);
  margin: ${({ $margin }) => $margin};
  padding: ${({ $padding }) => $padding};
`;

export const H3 = styled.h3`
  font: var(--font_heading-3);
  color: var(--color_five);
  margin: ${({ $margin }) => $margin};
  padding: ${({ $padding }) => $padding};
`;

export const Text = styled.p`
  font: var(--font_body);
  color: var(--color_five);
  margin: ${({ $margin }) => $margin};
  padding: ${({ $padding }) => $padding};
`;
