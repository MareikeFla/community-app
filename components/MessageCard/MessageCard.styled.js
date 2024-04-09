import styled from "styled-components";

export const Card = styled.div`
  background-color: var(--color_white);
  border-radius: var(--border-radius_card);
  box-shadow: var(--shadow_card);
  padding: ${({ $hasButton }) =>
    $hasButton ? "3rem 1.5rem" : "3rem 1.5rem 2.75rem"};
`;

export const Message = styled.h2`
  font: var(--font_heading-2);
  color: var(--color_night);
  text-align: center;

  a,
  button {
    margin-top: 1rem;
  }
`;
