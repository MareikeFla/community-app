import styled from "styled-components";
export const EventFormStyled = styled.form`
  padding-top: 1.875rem;
  display: flex;
  flex-direction: column;
`;

export const SubtitleRight = styled.p`
  font: var(--font_info);
  margin-bottom: 1rem;
  margin-top: 0.5rem;
  text-align: right;
`;

export const SubtitleLeft = styled.p`
  font: var(--font_info);
  margin-bottom: 1rem;
  margin-top: 0.5rem;
  text-align: left;
`;

export const FormSection = styled.div`
  margin-bottom: 1.25rem;
`;

export const FormLabel = styled.label`
  margin-bottom: 0.313;
  color: var(--color_night);
  font: var(--font_label);
  display: block;
`;

export const FormInput = styled.input`
  padding: 0.5rem;
  border: none;
  background-color: #f5f5f5;
  border-radius: var(--border-radius_input);
  height: 2.5rem;
  width: 100%;

  &::placeholder {
    color: var(--color_grey);
  }
`;

export const FormInputTime = styled(FormInput)`
  width: 7.5rem;
`;
export const FormSelect = styled.select`
  padding: 0.5rem;
  margin-bottom: 0.625rem;
  border: none;
  background-color: #f5f5f5;
  width: 100%;
  color: var(--color_grey);
  height: 2.5rem;

  &::placeholder {
    color: var(--color_grey);
  }
`;

export const FormCheckboxWrapper = styled.div`
  border: 1px solid var(--color_light-grey);
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 2.875rem;
  padding: 0 0.875rem;
  margin-bottom: 0.625rem;
  border-radius: var(--border-radius_input);

  & > * {
    margin: 0;
  }
`;

export const FormSelectOption = styled.option``;

export const FormDesicriptionField = styled(FormInput)`
  min-height: 7.063rem;
`;

export const FormButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1.875rem;
`;

export const FormLegend = styled.legend`
  font: var(--font_label);
  color: var(--color_night);
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

export const FlexContainer = styled.div`
  display: flex;
  gap: 0.75rem;
  margin-bottom: ${({ addMargin }) => (addMargin ? "20px" : "0")};
`;

export const FixedSize = styled.div`
  width: 5.125rem;
`;

export const FullWidth = styled.div`
  width: 100%;
`;
