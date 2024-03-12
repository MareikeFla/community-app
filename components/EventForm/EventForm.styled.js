import styled from "styled-components";
export const EventFormStyled = styled.form`
  padding-top: 1rem;
  display: flex;
  flex-direction: column;

  input::placeholder {
    color: var(--color_grey);
    font: var(--font_body);
  }

  input {
    font: var(--font_body);
    color: var(--color_night);
  }
`;

export const SubtitleRight = styled.p`
  font: var(--font_form-note);
  margin-top: ${({ $addmargintop }) => ($addmargintop ? "0.5rem" : "0")};
  text-align: right;
  color: var(--color_grey);
`;

export const SubtitleLeft = styled.p`
  font: var(--font_form-note);
  /* margin-top: 0.5rem; */
  text-align: left;
  color: var(--color_grey);
`;

export const FormSection = styled.div`
  margin-bottom: ${({ $smallermargin }) =>
    $smallermargin ? "0.5rem" : "1rem"};
  position: ${({ $positionrelative }) => ($positionrelative ? "relative" : "")};
`;

export const FormLabel = styled.label`
  margin-bottom: 0.15rem;
  color: var(--color_night);
  font: var(--font_label);
  display: block;
`;

export const FormInput = styled.input`
  padding: 0.5rem 0.75rem;
  border: none;
  background-color: #f5f5f5;
  border-radius: var(--border-radius_input);
  height: 2.5rem;
  width: 100%;
  margin-bottom: ${({ $addmarginbottom }) => ($addmarginbottom ? "20px" : "0")};

  &::placeholder {
    color: var(--color_grey);
  }

  &[type="date"] {
    color: var(--color_grey);
    text-transform: uppercase;
    font: var(--font_body);
  }

  &[type="date"]::-webkit-calendar-picker-indicator {
    opacity: 0;
  }

  &[type="time"]::-webkit-calendar-picker-indicator {
    display: none;
  }

  &[type="time"] {
    color: var(--color_grey);
    font: var(--font_body);
  }

  &:focus-visible {
    outline: 1px solid var(--color_orange);
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
  padding: 0.5rem;

  border: none;
  background-color: #f5f5f5;
  width: 100%;
  color: var(--color_grey);
  height: 2.5rem;
  border-radius: var(--border-radius_input);
  font: var(--font_body);

  &:focus-visible {
    outline: 1px solid var(--color_orange);
  }

  &::-ms-expand {
    padding-right: 1rem;
  }
  &:hover {
    cursor: pointer;
  }
`;

export const FormCheckboxWrapper = styled.div`
  border: 1px solid var(--color_light-grey);
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 2.875rem;
  padding: 0 0.875rem;
  margin-bottom: 1.1rem;
  border-radius: var(--border-radius_input);

  & > * {
    margin: 0;
  }
`;

export const FormSelectOption = styled.option``;

export const FormDesicriptionField = styled.textarea`
  min-height: ${({ $smallerminheight }) =>
    $smallerminheight ? "5.5rem" : "7.063rem"};
  overflow: scroll;
  padding: 0.5rem 0.75rem;
  border: none;
  background-color: #f5f5f5;
  border-radius: var(--border-radius_input);
  height: 2.5rem;
  width: 100%;
  margin-bottom: ${({ $addmarginbottom }) => ($addmarginbottom ? "20px" : "0")};
  font: var(--font_body);
  color: var(--color_night);
  resize: none;

  &:focus-visible {
    outline: 1px solid var(--color_orange);
  }
`;

export const FormButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 1.875rem;
`;

export const FormLegend = styled.legend`
  font: var(--font_label);
  color: var(--color_night);
  margin-bottom: 0.8rem;
`;

export const FormInfoText = styled.p`
  font: var(--font_form-note);
  color: var(--color_grey);
`;

export const ImageURLWrapper = styled.div`
  margin-bottom: 1.875rem;
`;

export const FormTimeDateWrapper = styled.div`
  display: flex;
  gap: 0.75rem;
`;

export const FlexContainer = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-bottom: ${({ $addmarginbottom }) => ($addmarginbottom ? "20px" : "0")};
`;

export const FixedSize = styled.div`
  width: 5.125rem;
`;

export const FullWidth = styled.div`
  width: 100%;
`;
export const CharacterCounter = styled.div`
  display: inline-block;
  position: absolute;
  right: 0.4rem;
  bottom: 1.5rem;
  font: var(--font_form-note);
  font-size: 8px;
`;
