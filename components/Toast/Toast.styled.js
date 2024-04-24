import styled from "styled-components";
import { ToastContainer } from "react-toastify";

export const StyledToastContainer = styled(ToastContainer)`
  padding: 1rem;
  .Toastify__toast {
    font: var(--font_body);
    color: #000;
    border-radius: var(--border-radius_card);
  }

  .Toastify__close-button {
    color: var(--color_night);
  }

  .Toastify__close-button:hover,
  .Toastify__close-button:focus {
    color: var(--color_midnight);
  }
`;
