import {
  SwitchContainer,
  SwitchInput,
  SwitchBackground,
  SwitchHandle,
} from "./SwitchButton.styled";
export default function SwitchButton({ toggleIsFreeOfCharge, isChecked }) {
  return (
    <SwitchContainer onClick={toggleIsFreeOfCharge}>
      <SwitchInput htmlFor="switch" $checked={isChecked} type="checkbox" />
      <SwitchBackground $checked={isChecked} />
      <SwitchHandle $checked={isChecked} />
    </SwitchContainer>
  );
}
