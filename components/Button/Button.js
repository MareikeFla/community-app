import { PrimaryButton, SecondaryButton } from "./Button.styled";

export default function Button({ type, text, color }) {
  if (color === "secondary") {
    return <SecondaryButton type={type}>{text}</SecondaryButton>;
  }
  return <PrimaryButton type={type}>{text}</PrimaryButton>;
}
