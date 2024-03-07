import styled from "styled-components";
import { SecondaryButton } from "../Button/Button.styled";

export const CommentFormContainer = styled.form`
  display: flex;
  flex-direction: column;
`;
export const CommentFormLabel = styled.label`
  font: var(--font_body-bold);
`;
export const CommentFormTextarea = styled.textarea`
  font: var(--font_body);
  background-color: var(--color_input-bg);
  border: none;
  border-radius: var(--border-radius_card);
  resize: none;
  margin-top: 0.625rem;
  margin-bottom: 1.875rem;
  &:focus-visible {
    outline: 1px solid var(--color_orange);
  }
`;

export const CommentButton = styled(SecondaryButton)`
  align-self: end;
  max-width: 9rem;
`;
