import styled from "styled-components";
export const EventFormStyled = styled.form`
  padding-top: 1.875rem;
  display: flex;
  flex-direction: column;
  /* gap: 2.25rem; */

  /* fieldset {
    border: none;
    color: var(--color_night);
    font: var(--font_label);
    display: flex;
    flex-direction: column;
    gap: 1rem;
  } */
`;

export const Subtitle = styled.p`
  font: var(--font_info);
`;

export const FormSection = styled.div`
  margin-bottom: 20px;
`;

export const FormLabel = styled.label`
  margin-bottom: 5px;
  color: var(--color_night);
  font: var(--font_label);
  display: block;
`;

export const FormInput = styled.input`
  padding: 8px;
  margin-bottom: 10px;
  border: none;
  background-color: #f5f5f5;
  border-radius: var(--border-radius_input);
  height: 40px;
  width: 100%;
`;

export const FormSelect = styled.select`
  padding: 8px;
  margin-bottom: 10px;
  border: none;
  background-color: #f5f5f5;
  width: 100%;
  color: var(--color_grey);

  &::placeholder {
    color: var(--color_grey);
  }
`;

export const FormCheckbox = styled.input`
  margin-right: 5px;
`;

export const FormCheckboxWrapper = styled.div`
  border: 1px solid var(--color_light-grey);
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 46px;
  padding: 0 0.875rem;
  margin-bottom: 10px;
`;

export const FormSelectOption = styled.option``;

export const FormDesicriptionField = styled(FormInput)`
  min-height: 113px;
`;
