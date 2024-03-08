import {
  SwitchContainer,
  SwitchInput,
  SwitchBackground,
  SwitchHandle,
} from "./SwitchButton.styled";
export default function SwitchButton({ onToggle, isChecked }) {
  const toggleSwitch = () => {
    if (onToggle) {
      onToggle(!isChecked);
    }
  };

  return (
    <SwitchContainer>
      <SwitchInput htmlFor="switch" checked={isChecked} type="checkbox" />
      <SwitchBackground checked={isChecked} />
      <SwitchHandle onClick={toggleSwitch} checked={isChecked} />
    </SwitchContainer>
  );
}
