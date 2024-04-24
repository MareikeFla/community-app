import styled from "styled-components";

export const ReplyButtonStyled = styled.button`
  color: var(--color_orange);
  font: var(--font_info);
  border: none;
  background-color: var(--color_white);
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;
