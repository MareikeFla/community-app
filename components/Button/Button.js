import { PrimaryButton, SecondaryButton } from "./Button.styled";

export default function Button({ type, text, color, onClick }) {
  if (color === "secondary") {
    return (
      <SecondaryButton type={type} onClick={onClick}>
        {text}
      </SecondaryButton>
    );
  }
  return (
    <PrimaryButton type={type} onClick={onClick}>
      {text}
    </PrimaryButton>
  );
}
