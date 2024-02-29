import styled from "styled-components";

export const StyledBackToTopButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 2.5rem;
  right: 1.25rem;
  height: 2.875rem;
  aspect-ratio: 1;
  background-color: var(--color_orange);
  border: none;
  border-radius: var(--border-radius_round-button);
  box-shadow: var(--shadow_round-button);
  opacity: ${(props) => (props.$showButton ? 1 : 0)};
  transition: var(--transition_button);
  cursor: pointer;

  &:hover {
    background-color: var(--color_light-orange);
  }
`;

export const Icon = styled.img``;
