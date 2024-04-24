import styled from "styled-components";

export const PrimaryButton = styled.button`
  display: flex;
  align-items: center;
  font: var(--font_button);
  color: var(--color_white);
  text-transform: uppercase;
  border: 2px solid var(--color_orange);
  border-radius: var(--border-radius_button);
  background-color: var(--color_orange);
  padding: 0.438rem 1.875rem 0.313rem;
  transition: var(--transition_button);
  cursor: pointer;

  &:hover {
    border: 2px solid var(--color_light-orange);
    background-color: var(--color_light-orange);
  }
`;

export const SecondaryButton = styled(PrimaryButton)`
  background-color: var(--color_white);
  color: var(--color_orange);

  &:hover {
    background: rgba(254, 183, 118, 0.15);
  }
`;
