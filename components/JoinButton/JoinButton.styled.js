import styled from "styled-components";

export const StyledJoinButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.313rem;
  font: var(--font_tag);
  color: var(--color_grey);
  text-transform: uppercase;
  border: 2px solid var(--color_grey);
  border-radius: var(--border-radius_button);
  background-color: transparent;
  padding: 0.25rem 0.5rem 0.188rem;
  transition: var(--transition_button);
  cursor: pointer;

  &:hover {
    border: 2px solid var(--color_night);
    color: var(--color_night);
  }
`;
