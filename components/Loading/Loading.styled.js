import styled from "styled-components";

export const Spinner = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  position: relative;
  margin: 3rem auto;
  animation: rotate var(--animation_speed) linear infinite;
  &::before,
  &::after {
    content: "";
    box-sizing: border-box;
    position: absolute;
    inset: 0px;
    border-radius: 50%;
    border: 5px solid var(--color_seven);
    animation: prixClipFix var(--animation_speed) linear infinite;
  }
  &::after {
    border-color: var(--color_ten);
    animation: prixClipFix var(--animation_speed) linear infinite,
      rotate calc(var(--animation_speed) / 4) linear infinite reverse;
    inset: 6px;
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes prixClipFix {
    0% {
      clip-path: polygon(50% 50%, 0 0, 0 0, 0 0, 0 0, 0 0);
    }
    25% {
      clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 0, 100% 0, 100% 0);
    }
    50% {
      clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 100% 100%, 100% 100%);
    }
    75% {
      clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 100%);
    }
    100% {
      clip-path: polygon(50% 50%, 0 0, 100% 0, 100% 100%, 0 100%, 0 0);
    }
  }
`;
