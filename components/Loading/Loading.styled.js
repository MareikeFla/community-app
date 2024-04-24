import styled from "styled-components";

export const Spinner = styled.div`
  width: ${({ $small }) => ($small ? "24px" : "48px")};
  height: ${({ $small }) => ($small ? "24px" : "48px")};
  border-radius: 50%;
  position: relative;
  margin: ${({ $small }) => ($small ? "0" : "3rem auto")};
  animation: rotate var(--animation_speed) linear infinite;
  &::before,
  &::after {
    content: "";
    box-sizing: border-box;
    position: absolute;
    inset: 0px;
    border-radius: 50%;
    border: ${({ $small }) => ($small ? "3px" : "5px")} solid
      var(--color_light-orange);
    animation: prixClipFix var(--animation_speed) linear infinite;
  }
  &::after {
    border-color: var(--color_red);
    animation: prixClipFix var(--animation_speed) linear infinite,
      rotate calc(var(--animation_speed) / 4) linear infinite reverse;
    inset: ${({ $small }) => ($small ? "3px" : "6px")};
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
