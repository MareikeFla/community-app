import styled from "styled-components";

export const PrimaryButton = styled.button`
  border-radius: var(--border-radius_button);
  border: 2px solid var(--color_orange);
  text-transform: uppercase;
  padding: 0.36rem 1.875rem 0.33rem 1.875rem;
  background-color: var(--color_white);
  color: var(--color_orange);
  font: var(--font_button-primary);
  display: flex;
  align-items: center;

  p {
    text-align: center;
  }
`;

export const SecondaryButton = styled(PrimaryButton)`
  border: 2px solid var(--color_orange);
  background-color: var(--color_orange);
  color: var(--color_white);
`;
