import styled from "styled-components";

export const Button = styled.button`
  background-color: transparent;
  border: none;
  margin: 0.375rem 0 0 auto;
  padding: 0;
  text-align: inherit;
  font: inherit;
  border-radius: 0;
  appearance: none;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

export const ButtonText = styled.span`
  font: var(--font_label);
  color: var(--color_night);
`;
