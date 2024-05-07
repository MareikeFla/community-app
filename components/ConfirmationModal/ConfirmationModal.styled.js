import styled from "styled-components";
import { Card, Message } from "../MessageCard/MessageCard.styled";

export const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: black;
  opacity: 0.4;
  z-index: 9;
`;

export const Dialog = styled(Card)`
  padding: 1.75rem 1.5rem;
  margin: auto;
  text-align: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  max-width: 95%;
`;

export const DialogMessage = styled(Message)`
  margin-bottom: 1.125rem;
  min-width: 100%;
  font-weight: 400;
`;

export const ButtonWrap = styled.div`
  font-size: 0.9375rem;
  min-width: max-content;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 0.75rem;
`;
