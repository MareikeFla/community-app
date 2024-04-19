import styled from "styled-components";
import { Card } from "../MessageCard/MessageCard.styled";
import { Message } from "../MessageCard/MessageCard.styled";

export const AccordionWrap = styled.div`
  padding-top: 1rem;
`;

export const AccordionHeader = styled(Card)`
  display: grid;
  grid-template-columns: auto 1fr 1fr;
  align-items: center;
  gap: 0.5rem;
  padding: ${({ $isOpen }) =>
    $isOpen
      ? "0.75rem 0.75rem 0.625rem 1.5rem"
      : "0.75rem 0.75rem 0.5rem 1.5rem"};
  transition: all 0.3s;
  box-shadow: ${({ $isOpen, $isHighlighted }) =>
    $isHighlighted
      ? "inset 0 2px 0 0 var(--color_orange), var(--shadow_card)"
      : "inset 0 2px 0 0 var(--color_light-grey), var(--shadow_card)"};
`;
export const AccordionTitle = styled(Message)`
  text-align: left;
`;
export const Counter = styled.p`
  justify-self: right;
  font: var(--font_info);
  font-weight: 600;
  color: var(--color_white);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ $isHighlighted }) =>
    $isHighlighted ? "var(--color_orange)" : "var(--color_night)"};
  width: 1.5rem;
  height: 1.5rem;
  aspect-ratio: 1;
  border-radius: 50%;
`;

export const AccordionBody = styled.div`
  margin-bottom: ${({ $isOpen }) => ($isOpen ? "1rem" : "0")};
  padding-top: ${({ $isOpen }) => ($isOpen ? "1rem" : "0")};
  display: grid;
  grid-template-rows: ${({ $isOpen }) => ($isOpen ? "1fr" : "0fr")};
  transition: 0.3s;
  & > * {
    overflow: hidden;
  }
`;

export const StyledArrow = styled.svg`
  transform: ${({ $isOpen }) => ($isOpen ? "rotate(90deg)" : "rotate(0)")};
  transition: transform 0.6s;
`;
