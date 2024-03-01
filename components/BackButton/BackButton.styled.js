import Image from "next/image";
import styled from "styled-components";

export const BackButtonWrapper = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0.625rem;
  left: 0.625rem;
  height: 1.875rem;
  aspect-ratio: 1;
  background-color: var(--color_orange);
  border: none;
  border-radius: var(--border-radius_round-button);
  box-shadow: var(--shadow_round-button);
  transition: var(--transition_button);
  cursor: pointer;

  &:hover {
    background-color: var(--color_light-orange);
  }
`;

export const BackIcon = styled(Image)`
  margin-right: 0.125rem;
`;
