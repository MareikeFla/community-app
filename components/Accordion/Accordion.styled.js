import styled from "styled-components";
import { Card } from "../MessageCard/MessageCard.styled";
import { Message } from "../MessageCard/MessageCard.styled";

export const AccordionWrap = styled.div`
  padding-top: 1rem;
`;

export const AccordionSection = styled(Card)`
  padding: ${({ $isOpen }) =>
    $isOpen ? "0.75rem 0 0.625rem 1.5rem" : "0.75rem 0 0.5rem 1.5rem"};
  position: relative;
  transition: all 0.3s ease-in-out;
  box-shadow: ${({ $isOpen, $hasItems }) =>
    $hasItems
      ? $isOpen
        ? "inset 0 2px 0 0 var(--color_orange), var(--shadow_card)"
        : "inset 0 -2px 0 0 var(--color_orange), var(--shadow_card)"
      : "inset 0 -2px 0 0 var(--color_light-grey), var(--shadow_card)"};

  &:not(:first-child) {
    margin-top: ${({ $isOpen }) => ($isOpen ? "0.5rem" : "0")};
    transition: margin-top 0.3s;
  }
`;
export const AccordionTitle = styled(Message)`
  text-align: left;
`;
export const Counter = styled.p`
  font: var(--font_info);
  font-weight: 600;
  color: var(--color_white);
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ $hasItems }) =>
    $hasItems ? "var(--color_orange)" : "var(--color_night)"};
  width: 1.5rem;
  aspect-ratio: 1;
  border-radius: 50%;
  position: absolute;
  top: 5px;
  right: 5px;
`;

export const PreviewWrap = styled.div`
  margin-bottom: ${({ $isOpen }) => ($isOpen ? "1rem" : "0")};
  padding-top: ${({ $isOpen }) => ($isOpen ? "1rem" : "0")};
  display: grid;
  grid-template-rows: ${({ $isOpen }) => ($isOpen ? "1fr" : "0fr")};
  transition: 0.5s;
  ul {
    overflow: hidden;
  }
`;
