import styled from "styled-components";

export const FlexBox = styled.div`
  display: flex;
  flex-direction: ${({ $direction }) => $direction};
  align-items: ${({ $align }) => $align};
  justify-content: ${({ $justify }) => $justify};
  gap: ${({ $gap }) => $gap};
  width: ${({ $width }) => $width};
  margin: ${({ $margin }) => $margin};
  padding: ${({ $padding }) => $padding};
`;
