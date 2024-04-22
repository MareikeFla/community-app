import styled from "styled-components";
import { SecondaryButton } from "../Button/Button.styled";

export const ReplyCommentFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
`;
export const ReplyCommentFormLabel = styled.label`
  font: var(--font_body);
  font-weight: 600;
  color: var(--color_five);
`;
export const ReplyCommentFormTextarea = styled.textarea`
  color: var(--color_four);

  font: var(--font_body);
  background-color: var(--color_two);
  border: none;
  border-radius: var(--border-radius_input);
  resize: none;
  margin: 0.25rem 0 1.875rem;
  padding: 0.375rem 0.75rem;
  &:focus-visible {
    outline: 1px solid var(--color_eight);
  }
`;

export const ReplyCommentButton = styled(SecondaryButton)`
  align-self: end;
`;

export const JustifyRight = styled.div`
  display: flex;
  justify-content: end;
`;
