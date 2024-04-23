import styled from "styled-components";

export const StyledJoinButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.313rem;
  font: var(--font_tag);
  color: var(--color_four);
  text-transform: uppercase;
  border: 1px solid var(--color_four);
  border-radius: var(--border-radius_button);
  background-color: transparent;
  padding: 0.25rem 0.5rem 0.188rem;
  transition: var(--transition_button);
  cursor: pointer;

  &:hover {
    border: 1px solid var(--color_five);
    color: var(--color_five);
  }
`;
