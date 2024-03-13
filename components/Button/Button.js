import { PrimaryButton, SecondaryButton } from "./Button.styled";

export default function Button({
  type,
  text,
  color,
  onClick,
  secondaryButtonRef,
  primaryButtonRef,
}) {
  if (color === "secondary") {
    return (
      <SecondaryButton type={type} onClick={onClick} ref={secondaryButtonRef}>
        {text}
      </SecondaryButton>
    );
  }
  return (
    <PrimaryButton type={type} onClick={onClick} ref={primaryButtonRef}>
      {text}
    </PrimaryButton>
  );
}
