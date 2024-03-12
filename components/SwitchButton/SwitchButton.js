import {
  SwitchContainer,
  SwitchInput,
  SwitchBackground,
  SwitchHandle,
} from "./SwitchButton.styled";
export default function SwitchButton({ toggleCosts, isChecked }) {
  return (
    <SwitchContainer onClick={toggleCosts}>
      <SwitchInput htmlFor="switch" $checked={isChecked} type="checkbox" />
      <SwitchBackground $checked={isChecked} />
      <SwitchHandle $checked={isChecked} />
    </SwitchContainer>
  );
}
