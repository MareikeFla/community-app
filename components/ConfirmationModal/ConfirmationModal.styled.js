import styled from "styled-components";
import { Card } from "../MessageCard/MessageCard.styled";

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.4;
  z-index: 3;
`;

export const Dialog = styled(Card)`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 4;
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
