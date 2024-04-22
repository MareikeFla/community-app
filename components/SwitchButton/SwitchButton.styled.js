import styled from "styled-components";

export const SwitchContainer = styled.div`
  position: relative;
  display: inline-block;
  width: 46px;
  height: 24px;
`;

export const SwitchInput = styled.input`
  display: none;
`;

export const SwitchBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({ $checked }) =>
    $checked ? "var(--color_gradientOne)" : "var(--color_three)"};
  border-radius: 17px;
  &:hover {
    cursor: pointer;
  }
`;

export const SwitchHandle = styled.div`
  position: absolute;
  top: 2px;
  width: 20px;
  height: 20px;
  background-color: white;
  border-radius: 50%;
  left: ${({ $checked }) => ($checked ? "calc(100% - 22px)" : "2px")};
  transition: left var(--transition_button) ease;
  &:hover {
    cursor: pointer;
  }
`;
