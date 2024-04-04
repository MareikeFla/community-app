import {
  SwitchContainer,
  SwitchInput,
  SwitchBackground,
  SwitchHandle,
} from "./SwitchButton.styled";
export default function SwitchButton({ isChecked, onChange }) {
  return (
    <SwitchContainer onClick={onChange}>
      <SwitchInput type="checkbox" checked={isChecked} onChange={() => {}} />
      <SwitchBackground $checked={isChecked} />
      <SwitchHandle $checked={isChecked} />
    </SwitchContainer>
  );
}
