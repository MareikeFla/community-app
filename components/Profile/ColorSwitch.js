import {
  SwitchContainer,
  SwitchInput,
  SwitchBackground,
  SwitchHandle,
} from "./Profile.styled";
export default function ColorSwitch({ isChecked, onChange }) {
  return (
    <SwitchContainer onClick={onChange}>
      <SwitchInput type="checkbox" checked={isChecked} onChange={() => {}} />
      <SwitchBackground />
      <SwitchHandle $checked={isChecked} />
    </SwitchContainer>
  );
}
