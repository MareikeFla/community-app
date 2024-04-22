import styled from "styled-components";
import Image from "next/image";

export const EventFormStyled = styled.form`
  padding-top: 1rem;
  display: flex;
  flex-direction: column;

  input::placeholder {
    font: var(--font_body);
    color: var(--color_four);
  }

  input {
    font: var(--font_body);
    color: var(--color_four);
  }
`;

export const SubtitleRight = styled.p`
  font: var(--font_form-note);
  color: var(--color_four);
  text-align: right;
  margin-top: ${({ $addmargintop }) => ($addmargintop ? "0.5rem" : "0")};
  @-moz-document url-prefix() {
    margin-top: 0.25rem;
  }
`;

export const SubtitleLeft = styled.p`
  font: var(--font_form-note);
  color: var(--color_four);
`;

export const FormSection = styled.div`
  margin-bottom: ${({ $smallermargin }) =>
    $smallermargin ? "0.5rem" : "1rem"};
  position: ${({ $positionrelative }) => ($positionrelative ? "relative" : "")};
`;

export const FormLabel = styled.label`
  display: block;
  font: var(--font_label);
  color: var(--color_five);
  margin-bottom: 0.15rem;

  div {
    font: var(--font_form-note);
    color: var(--color_four);
    margin-bottom: 0.188rem;
  }
`;

export const FormInput = styled.input`
  color: var(--color_four);
  background-color: var(--color_two);
  border: none;
  border-radius: var(--border-radius_input);
  width: 100%;
  height: 2.5rem;
  padding: 0.5rem 0.75rem;
  margin-bottom: ${({ $addmarginbottom }) =>
    $addmarginbottom ? "1.25rem" : "0"};

  &::placeholder {
    color: var(--color_four);
  }

  &[type="date"] {
    font: var(--font_body);
    color: var(--color_four);
    text-transform: uppercase;
  }

  &[type="date"]::-webkit-calendar-picker-indicator {
    opacity: 0;
  }

  &[type="time"]::-webkit-calendar-picker-indicator {
    display: none;
  }

  &[type="time"] {
    font: var(--font_body);
    color: var(--color_four);
  }

  &:focus-visible {
    outline: 1px solid var(--color_eight);
  }

  &[type="date"]:hover {
    cursor: pointer;
  }
`;

export const FormInputTime = styled(FormInput)`
  width: 7.5rem;

  &:hover {
    cursor: pointer;
  }
`;

export const FormSelect = styled.select`
  font: var(--font_body);
  color: var(--color_four);
  background-color: var(--color_two);
  width: 100%;
  height: 2.5rem;
  padding: 0.5rem;
  border: none;
  border-radius: var(--border-radius_input);

  &:focus-visible {
    outline: 1px solid var(--color_eight);
  }

  &:hover {
    cursor: pointer;
  }
`;

export const FileInput = styled.input`
  display: none;
`;

export const UploadButton = styled.label`
  margin: auto auto 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.375rem;
  padding: 0.938rem 1.25rem 0.875rem;
  background-color: var(--color_white);
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color_eight);
  text-transform: uppercase;
  border: 2px solid var(--color_three);
  border-radius: var(--border-radius_card);
  cursor: pointer;

  &:hover {
    border-color: var(--color_eight);
  }
`;

export const UploadPreviewContainer = styled.div`
  position: relative;
  margin: auto;
  height: 14.75rem;

  @media (min-width: 1024px) {
    height: 19rem;
  }
`;

export const UploadPreview = styled(Image)`
  border-radius: var(--border-radius_card);
  object-fit: cover;
`;

export const FormCheckboxWrapper = styled.div`
  padding: 0.625rem 0.875rem;
  margin: ${({ $consentMargin }) =>
    $consentMargin ? "0.5rem 0 0.25rem" : "0.25rem 0 1.125rem"};
  border: 1px solid var(--color_three);
  border-radius: var(--border-radius_input);

  & > * {
    margin: 0;
  }

  label {
    color: var(--color_five);
    font: var(--font_label);
  }

  p {
    font: var(--font_info);
    margin-top: 0.438rem;
  }
`;

export const FlexWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ErrorMessage = styled.p`
  color: var(--color_ten);
`;

export const FormDescriptionField = styled.textarea`
  font: var(--font_body);
  color: var(--color_five);
  background-color: var(--color_two);
  border: none;
  border-radius: var(--border-radius_input);
  width: 100%;
  margin-bottom: ${({ $addmarginbottom }) =>
    $addmarginbottom ? "1.25rem" : "0"};
  padding: 0.5rem 0.75rem;
  resize: none;
  overflow: hidden;

  &.auto-resizing-textarea {
    white-space: pre-wrap;
    word-wrap: break-word;
    position: absolute;
    top: 0;
    left: 0;
    height: ${({ $longDescriptionHeight }) =>
      $longDescriptionHeight + "px" || "auto"};
  }

  &:focus-visible {
    outline: 1px solid var(--color_eight);
  }

  &:-webkit-scrollbar {
    display: none; /* Safari and Chrome */
  }
`;

export const TextAreaContainer = styled.div`
  position: relative;
  height: ${({ $longDescriptionHeight }) =>
    $longDescriptionHeight + "px" || "auto"};
`;

export const TextAreaMirror = styled.div`
  white-space: pre-wrap;
  word-wrap: break-word;
  font: var(--font_body);
  padding: 0.5rem 0.75rem;
  width: 100%;
  visibility: hidden;
  position: absolute;
  top: 0;
  left: 0;
  overflow: auto;
  height: auto;
  resize: none;
`;

export const FormButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 1.875rem;
  margin-top: 1rem;

  button {
    justify-content: center;
  }

  @media (min-width: 375px) {
    flex-direction: row;
  }
`;

export const FormLegend = styled.legend`
  font: var(--font_label);
  color: var(--color_five);
  margin-bottom: 0.813rem;
`;

export const FormInfoText = styled.p`
  font: var(--font_form-note);
  color: var(--color_four);
`;

export const FormTimeDateWrapper = styled.div`
  display: flex;
  gap: 0.75rem;
`;

export const FlexContainer = styled.div`
  display: flex;
  gap: 1.25rem;
  margin-bottom: ${({ $addmarginbottom }) => ($addmarginbottom ? "1rem" : "0")};
`;

export const FixedSize = styled.div`
  width: 5.5rem;
`;

export const FullWidth = styled.div`
  width: 100%;
`;
export const CharacterCounter = styled.div`
  display: inline-block;
  position: absolute;
  top: 0.25rem;
  right: 0.438rem;
  font: var(--font_form-note);
  font-size: 0.563rem;
`;
