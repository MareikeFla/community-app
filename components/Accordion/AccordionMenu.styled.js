import styled from "styled-components";
import { Card, Message } from "../MessageCard/MessageCard.styled";

export const AccordionWrap = styled.div`
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const AccordionHeader = styled(Card)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem 0.75rem 1rem;
`;
export const AccordionTitle = styled(Message)`
  text-align: left;
`;
export const OpenArrow = styled.p`
  justify-self: right;
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
  transform: ${({ $isOpen }) => ($isOpen ? "rotate(90deg)" : "rotate(-90deg)")};
  transition: transform 0.6s;
`;

export const Counter = styled.p`
  font: var(--font_info);
`;

export const TitleCounterWrap = styled.div`
  display: flex;
  flex-direction: column;
`;
