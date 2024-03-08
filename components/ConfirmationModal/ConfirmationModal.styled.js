import styled from "styled-components";

export const Dialog = styled.dialog`
  padding: 1.7rem 0;
  margin: auto;
  border: none;
  border-radius: var(--border-radius_card);

  &::backdrop {
    background-color: black;
    opacity: 40%;
  }
`;

export const DialogMessage = styled.p`
  margin: 0 4rem 1.4rem 4rem;
  color: var(--color_grey);
  font: var(--font_body);
  font-weight: bold;
  text-align: center;
`;

export const ButtonWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 10px;
`;

export const Button = styled.button`
  padding: 6px 30px;
  font: var(--font_button-primary);
  color: var(--color_orange);
  border: 2px solid var(--color_orange);
  border-radius: var(--border-radius_button);
  background-color: var(--color_white);
  transition: var(--transition_button);
  cursor: pointer;
  box-shadow: none;
  text-transform: uppercase;

  &:hover {
    background-color: #fff4eb;
  }

  &.primary {
    background-color: var(--color_orange);
    color: var(--color_white);
    font: var(--font_button-primary);
  }

  &.primary:hover {
    background-color: var(--color_light-orange);
  }
`;
