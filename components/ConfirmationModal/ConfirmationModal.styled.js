import styled from "styled-components";

export const Dialog = styled.dialog`
  padding: 1rem 1.5rem;
  margin: auto;
  border: none;
  border-radius: var(--border-radius_card);
  font: var(--font_heading);

  &::backdrop {
    background-color: black;
    opacity: 40%;
  }
`;

export const DialogMessage = styled.p`
  margin-bottom: 1rem;
  color: var(--color_grey);
`;

export const ButtonWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

export const Button = styled.button`
  padding: 3px 10px;
  font: var(--font_button-primary);
  color: var(--color_orange);
  border: 2px solid var(--color_orange);
  border-radius: var(--border-radius_button);
  background-color: var(--color_white);
  transition: var(--transition_button);
  cursor: pointer;
  box-shadow: none;

  &:hover {
    background-color: #fff4eb;
  }

  &.primary {
    background-color: var(--color_orange);
    color: var(--color_white);
  }

  &.primary:hover {
    background-color: var(--color_light-orange);
  }
`;
