import styled from "styled-components";
import { PrimaryButton } from "../Button/Button.styled";

export const CommentFormContainer = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: ${({ $editing }) => ($editing ? "0" : "2rem")};
`;
export const CommentFormLabel = styled.label`
  font: var(--font_body);
  font-weight: 600;
  color: var(--color_night);

  ${({ $hidden }) =>
    $hidden &&
    `
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  `};
`;
export const CommentFormTextarea = styled.textarea`
  font: var(--font_body);
  background-color: var(--color_pale-grey);
  border: none;
  border-radius: var(--border-radius_input);
  resize: none;
  margin: 0.25rem 0 1.875rem;
  margin: ${({ $editing }) =>
    $editing ? "0.25rem 0 1rem" : "0.25rem 0 1.875rem"};

  padding: 0.375rem 0.75rem;
  &:focus-visible {
    outline: 1px solid var(--color_orange);
  }
`;

export const CommentButton = styled(PrimaryButton)`
  align-self: end;
  ${({ $editing }) =>
    $editing &&
    `
  color: var(--color_orange);
  font-size: 1rem;
  font: var(--font_info);
  padding: 0;
  text-transform: none;
  border: none;
  background-color: var(--color_white);
  cursor: pointer;

  &:hover {
    color: var(--color_orange);
    font: var(--font_info);
    border: none;
    background-color: var(--color_white);
    cursor: pointer;
    text-decoration: underline;
  }
`};
`;

export const EditButtonSection = styled.section`
  display: flex;
  justify-content: end;
  gap: 0.75rem;
`;
