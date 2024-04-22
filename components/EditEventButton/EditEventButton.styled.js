import styled from "styled-components";

export const EditButton = styled.button`
  position: absolute;
  top: 0.625rem;
  right: 0.625rem;
  height: 1.875rem;
  aspect-ratio: 1;
  background-color: var(--color_ten);
  border: none;
  border-radius: var(--border-radius_square-button);
  box-shadow: var(--shadow_button);
  transition: var(--transition_button);
  cursor: pointer;

  &:hover {
    background-color: var(--color_nine);
  }
`;
