import React from "react";
import { PrimaryButton, SecondaryButton } from "./Button.styled";

const Button = React.forwardRef(({ type, text, color, onClick }, ref) => {
  if (color === "secondary") {
    return (
      <SecondaryButton type={type} onClick={onClick} ref={ref}>
        {text}
      </SecondaryButton>
    );
  } else {
    return (
      <PrimaryButton type={type} onClick={onClick} ref={ref}>
        {text}
      </PrimaryButton>
    );
  }
});

export default Button;
