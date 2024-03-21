import React from "react";
import { PrimaryButton, SecondaryButton } from "./Button.styled";

const Button = React.forwardRef(({ type, text, color, onClick }, ref) => {
  if (color === "primary") {
    return (
      <PrimaryButton type={type} onClick={onClick} ref={ref}>
        {text}
      </PrimaryButton>
    );
  } else {
    return (
      <SecondaryButton type={type} onClick={onClick} ref={ref}>
        {text}
      </SecondaryButton>
    );
  }
});

export default Button;
