import styled from "styled-components";
export const EventFormStyled = styled.form`
  padding-top: 1.875rem;
  display: flex;
  flex-direction: column;
`;

export const Subtitle = styled.p`
  font: var(--font_info);
  margin-bottom: 1rem;
`;

export const FormSection = styled.div`
  margin-bottom: 1.25rem;
`;

export const FormLabel = styled.label`
  margin-bottom: 5px;
  color: var(--color_night);
  font: var(--font_label);
  display: block;
`;

export const FormInput = styled.input`
  padding: 8px;
  border: none;
  background-color: #f5f5f5;
  border-radius: var(--border-radius_input);
  height: 40px;
  width: 100%;

  &::placeholder {
    color: var(--color_grey);
  }
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

export const CancelButton = styled.button`
  border-radius: var(--border-radius_button);
  border: 2px solid var(--color_orange);
  text-transform: uppercase;
  padding: 0.75rem 1.875rem;
  background-color: var(--color_white);
  color: var(--color_orange);
  font: var(--font_button-primary);
`;

export const SubmitButton = styled.button`
  border-radius: var(--border-radius_button);
  border: 2px solid var(--color_orange);
  text-transform: uppercase;
  padding: 0.75rem 1.875rem;
  background-color: var(--color_orange);
  color: var(--color_white);
  font: var(--font_button-primary);
`;

export const FormButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1.875rem;
`;

export const FormLegend = styled.legend`
  font: var(--font_label);
`;

export const FormInfoText = styled.p`
  font: var(--font_footer);
  color: var(--color_grey);
`;

export const ImageURLWrapper = styled.div`
  margin-bottom: 1.875rem;
`;

export const FormTimeDateWrapper = styled.div`
  display: flex;
  gap: 0.75rem;
`;

export const SwitchContainer = styled.div`
  position: relative;
  display: inline-block;
  width: 46px;
  height: 24px;
`;

export const SwitchInput = styled.input`
  display: none;
`;

export const SwitchBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--color_sunset);
  border-radius: 17px;
`;

export const SwitchHandle = styled.div`
  position: absolute;
  top: 2px;
  width: 20px;
  height: 20px;
  background-color: white;
  border-radius: 50%;
  transition: transform 0.3s ease;
  left: ${({ isActive }) => (!isActive ? "calc(100% - 22px)" : "2px")};
`;
