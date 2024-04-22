import styled from "styled-components";

export const Button = styled.span`
  font: var(--font_tag);
  color: var(--color_base);
  text-transform: uppercase;
  background-color: ${(props) => `var(--color_${props.color})`};
  border: none;
  border-radius: var(--border-radius_button);
  padding: 0.375rem 0.625rem 0.3125rem;
`;
