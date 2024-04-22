import styled from "styled-components";

export const PrimaryButton = styled.button`
  display: flex;
  align-items: center;
  font: var(--font_button);
  color: var(--color_white);
  text-transform: uppercase;
  border: 2px solid var(--color_eight);
  border-radius: var(--border-radius_button);
  background-color: var(--color_eight);
  padding: 0.438rem 1.875rem 0.313rem;
  transition: var(--transition_button);
  cursor: pointer;

  &:hover {
    border: 2px solid var(--color_seven);
    background-color: var(--color_seven);
  }
`;

export const SecondaryButton = styled(PrimaryButton)`
  background-color: var(--color_white);
  color: var(--color_eight);

  &:hover {
    background: rgba(254, 183, 118, 0.15);
  }
`;
