import styled from "styled-components";

export const DelteButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0.625rem;
  right: 0.625rem;
  height: 1.875rem;
  aspect-ratio: 1;
  background-color: var(--color_red);
  border: none;
  border-radius: var(--border-radius_square-button);
  box-shadow: var(--shadow_button);
  transition: var(--transition_button);
  cursor: pointer;

  &:hover {
    background-color: var(--color_light-red);
  }
`;
